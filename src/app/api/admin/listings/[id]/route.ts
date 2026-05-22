import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
        const { title, description, price, address } = await request.json();

        if (!title || typeof title !== "string") {
            return NextResponse.json(
                { error: "Title field is required" },
                { status: 400 }
            );
        }

        const listing = await prisma.listing.update({
            where: {
                id,
            },
            data: {
                title,
                address,
                description,
                price,
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
        return NextResponse.json({ success: true, message: "Kohde poistettu" });
    } catch (error) {
        console.error("Error deleting listing:", error);
        return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
    }
}
