'use client';

import { Card, Image, Text } from '@mantine/core';
import Link from 'next/link';

type CardProps = {
  id: string;
  title: string;
  price: string;
  image: string;
};

export default function CardComponent({ id, title, price, image }: CardProps) {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href={`/kohde/${id}`}
      target="_blank"
      maw={500}
    >
      <Card.Section>
        <Image src={image} h={160} alt={title} />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {title}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {price}
      </Text>
    </Card>
  );
}
