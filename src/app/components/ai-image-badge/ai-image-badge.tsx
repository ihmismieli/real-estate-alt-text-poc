'use client';

import type { ImageOrigin } from '@/app/types/listing';
import Image from 'next/image';
import styles from './ai-image-badge.module.css';

type AiImageBadgeProps = {
  origin?: ImageOrigin | null;
};
const AI_BADGES: Partial<
  Record<
    ImageOrigin,
    {
      src: string;
      label: string;
    }
  >
> = {
  AI_BASIC: {
    src: '/icons/LABEL_AI_white_transparent.svg',
    label: 'Kuvassa on käytetty tekoälyä',
  },
  AI_GENERATED: {
    src: '/icons/LABEL_AI_GENERATED_white_transparent.svg',
    label: 'Kuva luotu tekoälyllä',
  },
  AI_EDITED: {
    src: '/icons/LABEL_AI_MODIFIED_white_transparent.svg',
    label: 'Kuvaa muokattu tekoälyllä',
  },
};

export default function AiImageBadge({ origin }: AiImageBadgeProps) {
  const badge = origin ? AI_BADGES[origin] : undefined;

  if (!badge) {
    return null;
  }

  return (
    <span className={styles.badge} role="img" aria-label={badge.label}>
      <Image src={badge.src} alt="" aria-hidden="true" width={40} height={40} />
    </span>
  );
}
