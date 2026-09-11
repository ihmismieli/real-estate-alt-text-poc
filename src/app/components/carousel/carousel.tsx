'use client';

import { Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { ImageOrigin } from '@/app/types/listing';
import AiImageBadge from '@/app/components/ai-image-badge/ai-image-badge';
import styles from './carousel.module.css';

type CarouselImage = {
  id: string;
  url: string;
  altText?: string | null;
  origin?: ImageOrigin | null;
};

type CarouselComponentProps = {
  images: CarouselImage[];
  labelledBy: string;
};

export default function CarouselComponent({
  images,
  labelledBy,
}: CarouselComponentProps) {
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
      <div className={styles.slideViewport}>
        <div className={styles.imageFrame}>
          <Image
            src={image.url}
            alt={image.altText ?? ''}
            className={styles.image}
          />

          <AiImageBadge origin={image.origin} />
        </div>
      </div>
    </Carousel.Slide>
  ));
  return (
    <Carousel
      withIndicators
      height={400}
      emblaOptions={{ loop: true, align: 'start' }}
      aria-labelledby={labelledBy}
      nextControlProps={{ 'aria-label': 'Seuraava kuva' }}
      previousControlProps={{ 'aria-label': 'Edellinen kuva' }}
    >
      {slides}
    </Carousel>
  );
}
