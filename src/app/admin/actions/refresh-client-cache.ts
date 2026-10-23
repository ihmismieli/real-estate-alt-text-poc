'use server';

import { refresh } from 'next/cache';
import { isCurrentUserAdmin } from '@/lib/dal';

export async function refreshClientCache(): Promise<void> {
    if (!(await isCurrentUserAdmin())) {
        throw new Error('Unauthorized');
    }

    refresh();
}