import { prisma } from '@/lib/prisma';

export async function getListings() {
    return prisma.listing.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            images: true,
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

export async function getListingByPublicId(publicId: number) {
    return prisma.listing.findUnique({
        where: { publicId },
        include: {
            images: true,
        },
    });
}