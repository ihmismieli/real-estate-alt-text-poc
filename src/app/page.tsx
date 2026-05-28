import styles from './page.module.css';
import CardComponent from './components/card/card';
import PageContainer from './components/page-container/page-container';
import { getListings } from '@/lib/listings';

export default async function Home() {
  const listings = await getListings();

  return (
    <PageContainer>
      <h1>Myytävät kohteet</h1>
      <div className={styles.cards}>
        {listings.map((listing) => (
          <CardComponent
            key={listing.id}
            id={listing.id}
            publicId={listing.publicId}
            address={listing.address}
            municipality={listing.municipality}
            price={listing.price}
            image={listing.images?.[0]?.url ?? '/listing-image-placeholder.png'}
          />
        ))}
      </div>
    </PageContainer>
  );
}
