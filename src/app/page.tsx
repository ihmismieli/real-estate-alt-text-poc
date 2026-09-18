import styles from './page.module.css';
import PageContainer from './components/page-container/page-container';
import Image from 'next/image';
import ScrollToLink from './components/scroll-to-link/scroll-to-link';
import AiImageBadge from './components/ai-image-badge/ai-image-badge';
import { Suspense } from 'react';
import Listings from './components/listings/listings';
import LoadingIndicator from './components/loading/loading';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/hero.webp"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 1300px) 100vw, 1300px"
          className={styles.heroImage}
        />

        <AiImageBadge origin="AI_BASIC" />

        <ScrollToLink targetId="myytavat-asunnot" className={styles.heroButton}>
          Tutustu kohteisiin
        </ScrollToLink>
      </section>

      <PageContainer>
        <section aria-labelledby="myytavat-asunnot">
          <h1 id="myytavat-asunnot">Myytävät kohteet</h1>

          <Suspense fallback={<LoadingIndicator />}>
            <Listings />
          </Suspense>
        </section>
      </PageContainer>
    </>
  );
}
