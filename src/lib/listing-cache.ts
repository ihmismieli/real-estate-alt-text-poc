import { revalidateTag } from 'next/cache';

export function invalidateListing(publicId: number) {
    revalidateTag('listings', { expire: 0 });
    revalidateTag(`listing:${publicId}`, { expire: 0 });
}