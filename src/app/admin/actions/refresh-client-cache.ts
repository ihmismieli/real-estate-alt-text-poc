'use server';

import { updateTag } from 'next/cache';
import { isCurrentUserAdmin } from '@/lib/dal';

export async function refreshClientCache(publicId: number): Promise<void> {
    if (!(await isCurrentUserAdmin())) {
        throw new Error('Unauthorized');
    }

    if (!Number.isSafeInteger(publicId) || publicId <= 0) {
        throw new Error('Invalid listing public ID');
    }

    updateTag('listings');
    updateTag(`listing:${publicId}`);
}