import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteListingUploadDirectory } from '@/lib/local-image-storage';
import { isCurrentUserAdmin } from "@/lib/dal";
import { del } from '@vercel/blob';
import { checkSameOrigin } from '@/lib/security';
import { listingFormSchema } from '@/app/schemas/listing-schema';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isCurrentUserAdmin())) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 })
    }

    try {
        const { id } = await params;
        const listing = await prisma.listing.findUnique({
            where: {
                id,
            },
            include: {
                images: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
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

    if (!(await isCurrentUserAdmin())) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 })
    }

    const originError = checkSameOrigin(request);

    if (originError) {
        return originError;
    }

    try {
        const { id } = await params;

        const parsed = listingFormSchema.safeParse(await request.json());
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: 'Virheelliset tiedot',
                    issues: parsed.error.issues,
                },
                { status: 400 }
            );
        }
        const { description, price, address, postalCode, district, municipality, apartmentType, rooms, livingArea } = parsed.data;

        const listing = await prisma.listing.update({
            where: {
                id,
            },
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
        return NextResponse.json(listing);
    } catch (error) {
        console.error("Error updating listing:", error);
        return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
    }

}
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isCurrentUserAdmin())) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 });
    }

    try {
        const { id } = await params;

        const listing = await prisma.listing.findUnique({
            where: { id },
            select: {
                id: true,
                publicId: true,
                images: {
                    select: {
                        storageKey: true,
                    },
                },
            },
        });

        if (!listing) {
            return NextResponse.json(
                { error: 'Kohdetta ei löytynyt' },
                { status: 404 }
            );
        }

        const blobKeys = listing.images.flatMap((image) =>
            image.storageKey ? [image.storageKey] : []
        );

        await Promise.all(blobKeys.map((storageKey) => del(storageKey)));

        await prisma.listing.delete({
            where: { id: listing.id },
        });

        await deleteListingUploadDirectory(String(listing.publicId));

        return NextResponse.json({
            success: true,
            message: 'Kohde poistettu',
        });
    } catch (error) {
        console.error('Error deleting listing:', error);

        return NextResponse.json(
            { error: 'Kohteen poistaminen epäonnistui' },
            { status: 500 }
        );
    }
}