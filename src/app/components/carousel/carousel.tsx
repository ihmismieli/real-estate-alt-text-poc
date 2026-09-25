'use client';

import { Image, VisuallyHidden } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { ImageOrigin, ImageType } from '@/app/types/listing';
import AiImageBadge from '@/app/components/ai-image-badge/ai-image-badge';
import styles from '@/app/components/carousel/carousel.module.css';
import { sortListingImages } from '@/app/utils/image-utils';
import { useState } from 'react';

export type CarouselImage = {
  id: string;
  url: string;
  altText?: string | null;
  origin?: ImageOrigin | null;
  imageType: ImageType;
  sortOrder: number;
};

type CarouselComponentProps = {
  images: CarouselImage[];
  labelledBy: string;
};

export default function CarouselComponent({
  images,
  labelledBy,
}: CarouselComponentProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <Image
        src="/listing-image-placeholder.png"
        alt="Kohteella ei ole kuvia"
        h={400}
      />
    );
  }

  const sortedImages = sortListingImages(images);

  const activeImage = sortedImages[selectedIndex];
  const activeAltText = activeImage?.altText?.trim() || '';

  return (
    <>
      <Carousel
        height={400}
        emblaOptions={{
          loop: true,
          align: 'start',
        }}
        aria-labelledby={labelledBy}
        aria-roledescription="kuvakaruselli"
        previousControlProps={{
          'aria-label': 'Edellinen kuva',
        }}
        nextControlProps={{
          'aria-label': 'Seuraava kuva',
        }}
        onSlideChange={setSelectedIndex}
        withKeyboardEvents={false}
      >
        {sortedImages.map((image, index) => (
          <Carousel.Slide
            key={image.id}
            aria-label={`Kuva ${index + 1}/${sortedImages.length}`}
            aria-roledescription="dia"
            aria-hidden={index !== selectedIndex}
          >
            <div className={styles.slideViewport}>
              <div className={styles.imageFrame}>
                <Image
                  src={image.url}
                  alt={image.altText?.trim() || ''}
                  className={styles.image}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                <AiImageBadge origin={image.origin} />
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>

      <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
        {activeAltText}
      </VisuallyHidden>
    </>
  );
}
