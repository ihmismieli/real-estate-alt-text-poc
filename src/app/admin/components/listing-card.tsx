'use client';

import Link from 'next/link';
import { Card, Image, Text, Group, Stack, Badge, Button } from '@mantine/core';
import { Listing } from '../../types/listing';

type ListingCardProps = {
  listing: Listing;
  onDelete: (id: string) => void;
};

export default function ListingCard({ listing, onDelete }: ListingCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="/listing-image-placeholder.png"
          height={220}
          alt={listing.title}
        />
      </Card.Section>

      <Stack mt="md" gap="xs">
        <Group justify="space-between">
          <Text fw={600}>{listing.title}</Text>

          {listing.price && (
            <Badge size="lg">{listing.price.toLocaleString('fi-FI')} €</Badge>
          )}
        </Group>

        {listing.address && (
          <Text c="dimmed" size="sm">
            {listing.address}
          </Text>
        )}

        {listing.description && (
          <Text lineClamp={3}>{listing.description}</Text>
        )}

        <Group mt="md">
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
