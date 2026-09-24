'use client';

import Link from 'next/link';
import { Card, Image, Text, Group, Stack, Badge, Button } from '@mantine/core';
import type { Listing } from '@/app/types/listing';

type ListingCardProps = {
  listing: Listing;
  onDelete: (id: string) => void;
};

export default function ListingCard({ listing, onDelete }: ListingCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card.Section>
        <Image
          src={listing.images?.[0]?.url ?? '/listing-image-placeholder.png'}
          height={220}
          alt={listing.images?.[0]?.altText ?? listing.address ?? 'Kohde'}
        />
      </Card.Section>

      <Stack mt="md" gap="md" style={{ flex: 1 }}>
        <Group justify="space-between">
          <Text fw={600} style={{ flex: 1, minWidth: 0 }}>
            {listing.address
              ? `${listing.address}${listing.district ? ', ' + listing.district : ''}${listing.municipality ? ', ' + listing.municipality : ''}`
              : 'Kohde'}
          </Text>
          {listing.price && (
            <Badge size="lg">{listing.price.toLocaleString('fi-FI')} €</Badge>
          )}
        </Group>

        {listing.rooms && <Text size="sm">{listing.rooms}</Text>}

        <Group style={{ marginTop: 'auto' }}>
          <Link href={`/admin/listings/${listing.id}`}>
            <Button size="sm" variant="light">
              Muokkaa
            </Button>
          </Link>

          <Button
            size="sm"
            color="red"
            variant="light"
            onClick={() => onDelete(listing.id)}
          >
            Poista
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
