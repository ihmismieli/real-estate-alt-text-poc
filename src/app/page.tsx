import styles from './page.module.css';
import CardComponent from './components/card/card';
import PageContainer from './components/page-container/page-container';
import { getListings } from '@/lib/listings';
import Image from 'next/image';
import ScrollToLink from './components/scroll-to-link/scroll-to-link';
import AiImageBadge from './components/ai-image-badge/ai-image-badge';

export default async function Home() {
  const listings = await getListings();

  return (
    <>
      <section className={styles.hero}>
        <Image
          src="/hero.webp"
          alt="Hero image"
          fill
          preload
          sizes="100vw"
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

          <ul
            className={styles.cards}
            aria-label={`Kohdelista, ${listings.length} kohdetta`}
          >
            {listings.map((listing) => {
              const firstImage = listing.images?.[0];

              return (
                <li key={listing.id}>
                  <CardComponent
                    publicId={listing.publicId}
                    address={listing.address}
                    municipality={listing.municipality}
                    price={listing.price}
                    district={listing.district}
                    rooms={listing.rooms}
                    livingArea={listing.livingArea?.toNumber() ?? null}
                    image={firstImage?.url ?? '/listing-image-placeholder.png'}
                    imageOrigin={firstImage?.origin}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </PageContainer>
    </>
  );
}
