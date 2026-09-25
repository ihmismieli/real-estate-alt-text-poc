import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isCurrentUserAdmin } from '@/lib/dal';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { del, put } from '@vercel/blob';
import { checkSameOrigin } from '@/lib/security';
import type { ImageOrigin, ImageType } from '@/app/types/listing';

export const runtime = 'nodejs';

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
const MAX_INPUT_PIXELS = 40_000_000;
const MAX_IMAGE_WIDTH = 1920;
const ALLOWED_MIME_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
]);
const ALLOWED_SHARP_FORMATS = new Set(['jpeg', 'png', 'webp']);

class InvalidImageError extends Error { }

function isFile(value: FormDataEntryValue): value is File {
    return value instanceof File;
}

async function optimizeImage(file: File) {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
        throw new InvalidImageError('Vain JPG-, PNG- ja WebP-kuvat sallitaan');
    }

    if (file.size === 0) {
        throw new InvalidImageError('Tyhjää tiedostoa ei voi ladata');
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        throw new InvalidImageError('Kuvan enimmäiskoko on 4 MB');
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());

    let metadata;

    try {
        metadata = await sharp(inputBuffer, {
            limitInputPixels: MAX_INPUT_PIXELS,
        }).metadata();
    } catch {
        throw new InvalidImageError('Tiedosto ei ole kelvollinen kuva');
    }

    if (!metadata.format || !ALLOWED_SHARP_FORMATS.has(metadata.format)) {
        throw new InvalidImageError('Vain JPG-, PNG- ja WebP-kuvat sallitaan');
    }

    const { data, info } = await sharp(inputBuffer, {
        limitInputPixels: MAX_INPUT_PIXELS,
    })
        .rotate()
        .resize({
            width: MAX_IMAGE_WIDTH,
            height: MAX_IMAGE_WIDTH,
            fit: 'inside',
            withoutEnlargement: true,
        })
        .webp({
            quality: 80,
            effort: 4,
        })
        .toBuffer({ resolveWithObject: true });

    return {
        buffer: data,
        width: info.width,
        height: info.height,
    };
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isCurrentUserAdmin())) {
        return NextResponse.json({ error: 'Ei oikeutta' }, { status: 401 });
    }

    const originError = checkSameOrigin(request);

    if (originError) {
        return originError;
    }

    if (!process.env.BLOB_STORE_ID) {
        console.error('BLOB_STORE_ID puuttuu');
        return NextResponse.json(
            { error: 'Kuvien tallennusta ei ole määritetty' },
            { status: 500 }
        );
    }
    const uploadedBlobs: Array<{
        url: string;
        pathname: string
    }> = [];

    try {
        const { id } = await params;
        const listing = await prisma.listing.findUnique({
            where: { id },
            select: { id: true, publicId: true },
        });

        if (!listing) {
            return NextResponse.json({ error: 'Kohdetta ei loytynyt' }, { status: 404 });
        }


        const formData = await request.formData();

        const altTextValue = formData.get('altText');

        if (altTextValue !== null && typeof altTextValue !== 'string') {
            return NextResponse.json(
                { error: 'Virheellinen tekstivastine' },
                { status: 400 }
            );
        }

        const altText = altTextValue?.trim() || null;

        const origin = formData.get('origin');

        const allowedOrigins = [
            'REAL_IMAGE',
            'AI_BASIC',
            'AI_GENERATED',
            'AI_EDITED',
            'UNKNOWN',
        ];

        if (
            typeof origin !== 'string' ||
            !allowedOrigins.includes(origin)
        ) {
            return NextResponse.json(
                { error: 'Virheellinen kuvan alkuperä' },
                { status: 400 }
            );
        }

        const imageType = formData.get('imageType');

        const allowedImageTypes = [
            'MAIN',
            'FLOOR_PLAN',
            'OTHER',
        ];

        if (
            typeof imageType !== 'string' ||
            !allowedImageTypes.includes(imageType)
        ) {
            return NextResponse.json(
                { error: 'Virheellinen kuvatyyppi' },
                { status: 400 }
            );
        }

        if (
            imageType === 'MAIN' ||
            imageType === 'FLOOR_PLAN'
        ) {
            const existingImage = await prisma.image.findFirst({
                where: {
                    listingId: listing.id,
                    imageType: imageType as ImageType,
                },
            });

            if (existingImage) {
                return NextResponse.json(
                    {
                        error:
                            imageType === 'MAIN'
                                ? 'Kohteella on jo pääkuva'
                                : 'Kohteella on jo pohjakuva',
                    },
                    { status: 409 }
                );
            }
        }


        const files = formData
            .getAll('images')
            .filter(isFile)
            .filter((file) => file.size > 0);

        if (files.length !== 1) {
            return NextResponse.json(
                { error: 'Lataa yksi kuva kerrallaan' },
                { status: 400 }
            );
        }

        const lastOtherImage = await prisma.image.findFirst({
            where: {
                listingId: listing.id,
                imageType: 'OTHER',
            },
            orderBy: {
                sortOrder: 'desc',
            },
            select: {
                sortOrder: true,
            },
        });

        const sortOrder =
            imageType === 'OTHER'
                ? (lastOtherImage?.sortOrder ?? -1) + 1
                : 0;

        const optimized = await optimizeImage(files[0]);

        const pathname = `listings/${listing.id}/${randomUUID()}.webp`;

        const blob = await put(pathname, optimized.buffer, {
            access: 'public',
            contentType: 'image/webp',
            addRandomSuffix: false,
        });

        uploadedBlobs.push(blob);

        const image = await prisma.image.create({
            data: {
                listingId: listing.id,
                url: blob.url,
                storageKey: blob.pathname,
                mimeType: 'image/webp',
                width: optimized.width,
                height: optimized.height,
                origin: origin as ImageOrigin,
                imageType: imageType as ImageType,
                sortOrder: sortOrder,
                altText: altText,
            },
        });

        return NextResponse.json([image], { status: 201 });
    } catch (error) {
        await Promise.allSettled(
            uploadedBlobs.map((blob) => del(blob.pathname))
        );

        if (error instanceof InvalidImageError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.error('Error uploading listing image:', error);

        return NextResponse.json(
            { error: 'Kuvan lataus epäonnistui' },
            { status: 500 }
        );
    }
}