'use client';

import { Card, Group, Image, Text } from '@mantine/core';

type CardProps = {
  publicId: number;
  address?: string | null;
  municipality?: string | null;
  district?: string | null;
  rooms?: string | null;
  price: number | null;
  livingArea?: number | null;
  image: string;
};

export default function CardComponent({
  publicId,
  address,
  district,
  municipality,
  price,
  image,
  rooms,
  livingArea,
}: CardProps) {
  const locationLabel =
    [address, district, municipality].filter(Boolean).join(', ') || 'Kohde';

  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href={`/kohde/${publicId}`}
      w="100%"
    >
      <Card.Section>
        <Image src={image} h={160} alt={'Kuva kohteesta'} />
      </Card.Section>

      <Text size="md" mt="md">
        {locationLabel}
      </Text>

      <Group justify="space-between" mt="xs" w="100%">
        {rooms && (
          <Text fw="lighter" c="dimmed">
            {rooms}
          </Text>
        )}

        {livingArea && (
          <Text fw="lighter" c="dimmed">
            {livingArea} m²
          </Text>
        )}

        {price && (
          <Text fw="lighter" c="dimmed">
            {price.toLocaleString('fi-FI')} €
          </Text>
        )}
      </Group>
    </Card>
  );
}
