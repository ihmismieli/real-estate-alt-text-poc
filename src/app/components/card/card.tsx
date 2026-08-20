'use client';

import { Card, Group, Text } from '@mantine/core';
import Image from 'next/image';

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
        <Image
          src={image}
          alt={'Kuva kohteesta'}
          width={768}
          height={512}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 340px"
          style={{
            width: '100%',
            height: '160px',
            objectFit: 'cover',
          }}
        />
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
