'use client';

import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { Listing } from '@/app/types/listing';

export function useListings() {
    const { data, error, isLoading, mutate } = useSWR<Listing[]>(
        '/api/admin/listings',
        fetcher
    );

    return {
        listings: data ?? [],
        error,
        isLoading,
        mutate,
    };
}