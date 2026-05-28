import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteListingUploadDirectory } from '@/lib/local-image-storage';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const listing = await prisma.listing.findUnique({
            where: {
                id,
            },
            include: {
                images: true,
            },
        });
        if (!listing) {
            return NextResponse.json({ error: "Kohdetta ei löytynyt" }, { status: 404 });
        }
        return NextResponse.json(listing);

    } catch (error) {
        console.error("Error fetching listing:", error);
        return NextResponse.json({ error: "Failed to fetch listing" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { description, price, address, postalCode, district, municipality, apartmentType, rooms } = await request.json();

        const listing = await prisma.listing.update({
            where: {
                id,
            },
            data: {
                address: address && address.trim() ? address : null,
                postalCode: postalCode && postalCode.trim() ? postalCode : null,
                district: district && district.trim() ? district : null,
                municipality: municipality && municipality.trim() ? municipality : null,
                description: description && description.trim() ? description : null,
                apartmentType: apartmentType && apartmentType.trim() ? apartmentType : null,
                rooms: rooms && rooms.trim() ? rooms : null,
                price: price ? parseInt(String(price), 10) : null,
            },
        });
        return NextResponse.json(listing);
    } catch (error) {
        console.error("Error updating listing:", error);
        return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
    }

}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.listing.delete({
            where: {
                id,
            },
        });
        await deleteListingUploadDirectory(id).catch((error) => {
            console.error('Error deleting upload directory:', error);
        });
        return NextResponse.json({ success: true, message: "Kohde poistettu" });
    } catch (error) {
        console.error("Error deleting listing:", error);
        return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
    }
}
