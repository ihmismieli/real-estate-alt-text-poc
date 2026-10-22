'use client';

import useSWR from 'swr';
import { fetcher } from '@/app/admin/utils/fetcher';
import { Listing } from '@/app/types/listing-types';
import { useState } from 'react';

export function useListing(id?: string) {
    const [hasProcessingImages, setHasProcessingImages] = useState(false);

    const { data, error, isLoading, mutate } = useSWR<Listing>(
        id ? `/api/admin/listings/${id}` : null,
        fetcher,
        {
            revalidateOnMount: true,
            refreshInterval: id && hasProcessingImages ? 5000 : 0,

            onSuccess: (listing) => {
                const isGenerating = listing.images?.some(
                    (image) => image.altTextStatus === 'PROCESSING'
                );

                setHasProcessingImages(isGenerating ?? false);
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
