import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isCurrentUserAdmin } from '@/lib/dal'
import { checkSameOrigin } from '@/lib/security';
import { listingFormSchema } from '@/app/schemas/listing-schema';

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
        return NextResponse.json(
            { error: 'Ei oikeutta' },
            { status: 401 })
    }

    const originError = checkSameOrigin(request);
    if (originError) {
        return originError;
    }

    try {

        const parsed = listingFormSchema.safeParse(await request.json());
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: 'Virheelliset tiedot',
                    issues: parsed.error.issues,
                },
                { status: 400 });
        }

        const { description, price, address, postalCode, district, municipality, apartmentType, rooms, livingArea, } = parsed.data;

        const listing = await prisma.listing.create({
            data: {
                address: address || null,
                postalCode: postalCode || null,
                district: district || null,
                municipality: municipality || null,
                description: description || null,
                apartmentType: apartmentType || null,
                rooms: rooms || null,
                price: price ? Number(price) : null,
                livingArea: livingArea
                    ? Number(livingArea.replace(',', '.'))
                    : null,
            },
        });
        return NextResponse.json(listing, { status: 201 });
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.json(
            { error: "Failed to create listing" },
            { status: 500 });
    }
}
