import styles from './page.module.css';
import CardComponent from './components/card/card';
import PageContainer from './components/page-container/page-container';
import { getListings } from '@/lib/listings';

export default async function Home() {
  const listings = await getListings();

  return (
    <PageContainer>
      <section aria-labelledby="listings-heading">
        <h1 id="listings-heading">Myytävät kohteet</h1>

        <ul
          className={styles.cards}
          aria-label={`Kohdelista, ${listings.length} kohdetta`}
        >
          {listings.map((listing) => (
            <li key={listing.id}>
              <CardComponent
                publicId={listing.publicId}
                address={listing.address}
                municipality={listing.municipality}
                price={listing.price}
                district={listing.district}
                rooms={listing.rooms}
                livingArea={listing.livingArea?.toNumber() ?? null}
                image={
                  listing.images?.[0]?.url ?? '/listing-image-placeholder.png'
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
