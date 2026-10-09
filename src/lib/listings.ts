import { prisma } from '@/lib/prisma';
import { cacheLife, cacheTag } from 'next/cache';

export async function getListings() {
    'use cache';

    cacheLife('hours');
    cacheTag('listings');

    const listings = await prisma.listing.findMany({
        where: {
            status: 'PUBLISHED',
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            images: true,
        },
    });

    return listings.map((listing) => ({
        ...listing,
        livingArea: listing.livingArea?.toNumber() ?? null,
    }));

}

export async function getListingById(id: string) {
    return prisma.listing.findUnique({
        where: { id },
        include: {
            images: true,
        },
    });
}

export async function getListingByPublicId(publicId: number) {
    'use cache';

    cacheLife('hours');
    cacheTag(`listing:${publicId}`);


    const listing = await prisma.listing.findUnique({
        where: {
            publicId,
            status: 'PUBLISHED',
        },
        include: {
            images: true,
        },
    });

    if (!listing) {
        return null;
    }

    return {
        ...listing,
        livingArea: listing.livingArea?.toNumber() ?? null,
    }
}