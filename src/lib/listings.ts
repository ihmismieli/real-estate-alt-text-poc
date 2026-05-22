import { prisma } from '@/lib/prisma';

export async function getListings() {
    return prisma.listing.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getListingById(id: string) {
    return prisma.listing.findUnique({
        where: { id },
        include: {
            images: true,
        },
    });
}