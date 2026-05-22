'use client';

import '@mantine/carousel/styles.css';
import { Image } from '@mantine/core';

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

import { Carousel } from '@mantine/carousel';

export default function CarouselComponent() {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} alt="Kohteen kuva" />
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
