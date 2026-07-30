'use client';

import { Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

type CarouselImage = {
  id: string;
  url: string;
  altText?: string | null;
};

type CarouselComponentProps = {
  images: CarouselImage[];
};

export default function CarouselComponent({ images }: CarouselComponentProps) {
  if (images.length === 0) {
    return (
      <Image
        src="/listing-image-placeholder.png"
        alt="Kohteella ei ole kuvia"
        h={400}
      />
    );
  }
  const slides = images.map((image) => (
    <Carousel.Slide key={image.id}>
      <Image src={image.url} alt={image.altText ?? ''} h={400} fit="contain" />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      height={400}
      emblaOptions={{ loop: true, align: 'start' }}
      aria-label="Kohteen kuvat"
      nextControlProps={{ 'aria-label': 'Seuraava kuva' }}
      previousControlProps={{ 'aria-label': 'Edellinen kuva' }}
    >
      {slides}
    </Carousel>
  );
}
