'use client';

import useSWR from 'swr';
import { fetcher } from '@/app/admin/utils/fetcher';
import { Listing } from '@/app/types/listing-types';

export function useListing(id?: string) {
    const { data, error, isLoading, mutate } = useSWR<Listing>(
        id ? `/api/admin/listings/${id}` : null,
        fetcher,
        {
            refreshInterval: (listing) => {
                const isGeneratingAltText = listing?.images?.some(
                    (image) => image.altTextStatus === 'PROCESSING'
                );
                return isGeneratingAltText ? 5000 : 0; // Refresh every 5 seconds if alt text is being generated
            },
        }
    );

    return {
        listing: data,
        error,
        isLoading,
        mutate,
    };
}
