import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { isCurrentUserAdmin } from '@/lib/dal';
import { checkSameOrigin } from '@/lib/security';
import { invalidateListing } from '@/lib/listing-cache';

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function POST(request: Request, { params }: Params) {
    if (!(await isCurrentUserAdmin())) {
        return NextResponse.json(
            { error: 'Ei oikeutta' }, { status: 401 }
        );
    }
    const originError = checkSameOrigin(request);

    if (originError) {
        return originError;
    }

    try {
        const { id } = await params;

        const listing = await prisma.listing.update({
            where: { id },
            data: {
                status: 'PUBLISHED',
            },
            select: {
                id: true,
                publicId: true,
                status: true,
            },
        });

        invalidateListing(listing.publicId);

        return NextResponse.json(listing);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            return NextResponse.json(
                { error: 'Kohdetta ei löytynyt' },
                { status: 404 }
            );
        }

        console.error('Error publishing listing:', error);

        return NextResponse.json(
            { error: 'Kohteen julkaiseminen epäonnistui' },
            { status: 500 }
        );
    }
}