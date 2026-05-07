'use client';

import { SimpleGrid } from '@mantine/core';
import ListingCard from './listing-card';
import { Listing } from '../../types/listing';

type ListingGridProps = {
  listings: Listing[];
  onDelete: (id: string) => void;
};

export default function ListingGrid({ listings, onDelete }: ListingGridProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} onDelete={onDelete} />
      ))}
    </SimpleGrid>
  );
}
