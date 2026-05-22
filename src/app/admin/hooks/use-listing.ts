'use client';

import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { Listing } from '@/app/types/listing';

export function useListing(id?: string) {
    const { data, error, isLoading, mutate } = useSWR<Listing>(
        id ? `/api/admin/listings/${id}` : null,
        fetcher
    );

    return {
        listing: data,
        error,
        isLoading,
        mutate,
    };
}