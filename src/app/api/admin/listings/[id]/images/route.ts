import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteLocalImageByUrl, saveListingImageLocally } from '@/lib/local-image-storage';
import { isCurrentUserAdmin } from '@/lib/dal';

export const runtime = 'nodejs';

function isFile(value: FormDataEntryValue): value is File {
    return value instanceof File;
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const savedFiles: Array<{ url: string; absolutePath: string }> = [];

    try {
        const listing = await prisma.listing.findUnique({
            where: { id },
            select: { id: true, publicId: true },
        });

        if (!listing) {
            return NextResponse.json({ error: 'Kohdetta ei loytynyt' }, { status: 404 });
        }

        if (!(await isCurrentUserAdmin())) {
            return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 })
        }

        const formData = await request.formData();
        const files = formData
            .getAll('images')
            .filter(isFile)
            .filter((file) => file.size > 0);

        if (files.length === 0) {
            return NextResponse.json({ error: 'Yhtaan kuvaa ei annettu' }, { status: 400 });
        }

        for (const file of files) {
            const savedFile = await saveListingImageLocally(String(listing.publicId), file);
            savedFiles.push(savedFile);
        }

        const images = await prisma.$transaction(
            savedFiles.map((file) =>
                prisma.image.create({
                    data: {
                        listingId: listing.id,
                        url: file.url,
                    },
                })
            )
        );

        return NextResponse.json(images, { status: 201 });
    } catch (error) {
        await Promise.all(savedFiles.map((file) => deleteLocalImageByUrl(file.url)));
        console.error('Error uploading listing images:', error);

        return NextResponse.json(
            { error: 'Kuvien lataus epaonnistui' },
            { status: 500 }
        );
    }
}