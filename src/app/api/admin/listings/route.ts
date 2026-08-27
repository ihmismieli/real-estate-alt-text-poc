import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCurrentUserAdmin } from '@/lib/dal'
import { checkSameOrigin } from '@/lib/security';

export async function GET() {

    if (!(await isCurrentUserAdmin())) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 })
    }

    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                images: true,
            },
        });
        return NextResponse.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    }
}


export async function POST(request: Request) {

    if (!(await isCurrentUserAdmin())) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 })
    }

    const originError = checkSameOrigin(request);
    if (originError) {
        return originError;
    }

    try {
        const { description, price, address, postalCode, district, municipality, apartmentType, rooms, livingArea, } = await request.json();

        const listing = await prisma.listing.create({
            data: {
                address: address && address.trim() ? address : null,
                postalCode: postalCode && postalCode.trim() ? postalCode : null,
                district: district && district.trim() ? district : null,
                municipality: municipality && municipality.trim() ? municipality : null,
                description: description && description.trim() ? description : null,
                apartmentType: apartmentType && apartmentType.trim() ? apartmentType : null,
                rooms: rooms && rooms.trim() ? rooms : null,
                price: price ? parseInt(String(price), 10) : null,
                livingArea: livingArea ? parseInt(String(livingArea), 10) : null,
            },
        });
        return NextResponse.json(listing, { status: 201 });
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
    }
}
