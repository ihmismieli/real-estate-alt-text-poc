import { NextResponse } from 'next/server';
import { isCurrentUserAdmin } from '@/lib/dal'
import { prisma } from '@/lib/prisma';
import { deleteLocalImageByUrl } from '@/lib/local-image-storage';

export const runtime = 'nodejs';

type Params = {
    params: Promise<{
        id: string;
        imageId: string;
    }>;
};

export async function PATCH(request: Request, { params }: Params) {
    const isAdmin = await isCurrentUserAdmin();

    if (!isAdmin) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 });
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
            },
        });

        if (!image) {
            return NextResponse.json({ error: 'Kuvaa ei loytynyt' }, { status: 404 });
        }

        const updatedImage = await prisma.image.update({
            where: {
                id: image.id,
            },
            data: {
                altText: altText?.trim() ? altText.trim() : null,
            },
        });

        return NextResponse.json(updatedImage);
    } catch (error) {
        console.error('Error updating image alt text:', error);
        return NextResponse.json(
            { error: 'Tekstivastineen paivittaminen epaonnistui' },
            { status: 500 }
        );
    }
}

export async function DELETE(_request: Request, { params }: Params) {
    const isAdmin = await isCurrentUserAdmin();

    if (!isAdmin) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 });
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
            },
        });

        if (!image) {
            return NextResponse.json({ error: 'Kuvaa ei loytynyt' }, { status: 404 });
        }

        await prisma.image.delete({
            where: {
                id: image.id,
            },
        });

        try {
            await deleteLocalImageByUrl(image.url);
        } catch (fileError) {
            console.error('Image file deletion failed:', fileError);
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error deleting listing image:', error);
        return NextResponse.json(
            { error: 'Kuvan poistaminen epaonnistui' },
            { status: 500 }
        );
    }
}