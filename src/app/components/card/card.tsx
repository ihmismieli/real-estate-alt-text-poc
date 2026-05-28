'use client';

import { Card, Image, Text } from '@mantine/core';

type CardProps = {
  id: string;
  publicId: number;
  address?: string | null;
  municipality?: string | null;
  price?: number | null;
  image: string;
};

export default function CardComponent({
  publicId,
  address,
  municipality,
  price,
  image,
}: CardProps) {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href={`/kohde/${publicId}`}
      w="100%"
      maw={500}
    >
      <Card.Section>
        <Image src={image} h={160} alt={address || 'Kohde'} />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {address || 'Kohde'}
      </Text>

      {municipality && (
        <Text mt="xs" c="dimmed" size="sm">
          {municipality}
        </Text>
      )}

      {price && (
        <Text mt="xs" fw={600}>
          {price.toLocaleString('fi-FI')} €
        </Text>
      )}
    </Card>
  );
}
