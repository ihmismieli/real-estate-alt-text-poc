'use client';

import { Card, Group, Text, Stack } from '@mantine/core';
import Image from 'next/image';
import type { ImageOrigin } from '@/app/types/listing';
import AiImageBadge from '@/app/components/ai-image-badge/ai-image-badge';

type CardProps = {
  publicId: number;
  address?: string | null;
  municipality?: string | null;
  district?: string | null;
  rooms?: string | null;
  price: number | null;
  livingArea?: number | null;
  image: string;
  imageOrigin?: ImageOrigin | null;
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
  imageOrigin,
}: CardProps) {
  const addressAndDistrict =
    address && district
      ? `${address}, ${district}`
      : address || district || 'Kohde';

  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href={`/kohde/${publicId}`}
      w="100%"
    >
      <Card.Section>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '160px',
          }}
        >
          <Image
            src={image}
            alt="Kuva kohteesta"
            width={768}
            height={512}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 340px"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          <AiImageBadge origin={imageOrigin} />
        </div>
      </Card.Section>

      <Stack gap={2} mt="md" mih="3.2em">
        <Text fw="bold" size="md" lineClamp={1}>
          {addressAndDistrict}
        </Text>

        {municipality && (
          <Text fw="bold" size="md" lineClamp={1}>
            {municipality}
          </Text>
        )}
      </Stack>

      <Group justify="space-between" mt="xs" w="100%">
        {rooms && (
          <Text fw="normal" size="sm">
            {rooms}
          </Text>
        )}

        {livingArea && (
          <Text fw="normal" size="sm">
            {livingArea} m²
          </Text>
        )}

        {price && (
          <Text fw="normal" size="sm">
            {price.toLocaleString('fi-FI')} €
          </Text>
        )}
      </Group>
    </Card>
  );
}
