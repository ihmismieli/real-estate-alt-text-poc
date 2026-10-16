import { revalidateTag } from 'next/cache';

/**
 *  Revalidate the listings and this listing's detail page when a listing is updated.
 */

export function invalidateListing(publicId: number) {
    revalidateTag('listings', { expire: 0 });
    revalidateTag(`listing:${publicId}`, { expire: 0 });
}

/**
 * Log cache errors without treating a successful save as a failure.
 */

export function invalidateListingSafely(publicId: number): void {
    try {
        invalidateListing(publicId);
    } catch (error) {
        console.error('Listing cache invalidation failed', {
            publicId,
            error,
        });
    }
}