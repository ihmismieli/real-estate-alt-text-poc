import { NextResponse } from 'next/server';
import { isCurrentUserAdmin } from '@/lib/dal'
import { prisma } from '@/lib/prisma';
import { deleteLocalImageByUrl } from '@/lib/local-image-storage';
import { del } from '@vercel/blob';
import { checkSameOrigin } from '@/lib/security';
import { invalidateListing, invalidateListingSafely } from '@/lib/listing-cache';


type ImageParams = {
    params: Promise<{
        id: string;
        imageId: string;
    }>;
};

export async function PATCH(request: Request, { params }: ImageParams) {
    const isAdmin = await isCurrentUserAdmin();

    if (!isAdmin) {
        return NextResponse.json(
            { error: 'Ei oikeutta' },
            { status: 401 }
        );
    }

    const originError = checkSameOrigin(request);

    if (originError) {
        return originError;
    }

    const { id, imageId } = await params;
    const { altText } = await request.json();

    if (typeof altText !== 'string' && altText !== null) {
        return NextResponse.json(
            { error: 'Virheellinen tekstivastine' },
            { status: 400 }
        );
    }

    try {
        const image = await prisma.image.findFirst({
            where: {
                id: imageId,
                listingId: id,
            },
            select: {
                id: true,
                listing: {
                    select: {
                        publicId: true,
                    },
                },
            },
        });

        if (!image) {
            return NextResponse.json(
                { error: 'Kuvaa ei loytynyt' },
                { status: 404 }
            );
        }

        const typedAltText = altText?.trim() || null;

        const updatedImage = await prisma.image.update({
            where: {
                id: image.id,
            },
            data: {
                altText: typedAltText,
                altTextSource: typedAltText ? 'MANUAL' : null,
                // Prevent automatic alt text generation replacing this edit.
                altTextStatus: 'IDLE',
                altTextStartedAt: null,
            },
        });

        invalidateListingSafely(image.listing.publicId);

        return NextResponse.json(updatedImage);
    } catch (error) {
        console.error('Error updating image alt text:', error);
        return NextResponse.json(
            { error: 'Tekstivastineen paivittaminen epaonnistui' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: ImageParams) {
    const isAdmin = await isCurrentUserAdmin();

    if (!isAdmin) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 });
    }

    const originError = checkSameOrigin(request);

    if (originError) {
        return originError;
    }

    const { id, imageId } = await params;

    try {
        const image = await prisma.image.findFirst({
            where: {
                id: imageId,
                listingId: id,
            },
            select: {
                id: true,
                url: true,
                storageKey: true,
                listing: {
                    select: {
                        publicId: true,
                    },
                },
            },
        });

        if (!image) {
            return NextResponse.json(
                { error: 'Kuvaa ei loytynyt' },
                { status: 404 }
            );
        }

        if (image.storageKey) {
            await del(image.storageKey);
        } else {
            await deleteLocalImageByUrl(image.url);
        }

        await prisma.image.delete({
            where: {
                id: image.id,
            },
        });

        invalidateListing(image.listing.publicId);


        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error deleting listing image:', error);
        return NextResponse.json(
            { error: 'Kuvan poistaminen epaonnistui' },
            { status: 500 }
        );
    }
}