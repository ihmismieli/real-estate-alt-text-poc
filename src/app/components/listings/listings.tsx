import { getListings } from '@/lib/listings';
import CardComponent from '@/app/components/card/card';
import styles from '@/app/components/listings/listings.module.css';

export default async function Listings() {
  const listings = await getListings();

  if (listings.length === 0) {
    return <p>Ei myytäviä kohteita tällä hetkellä.</p>;
  }

  return (
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
              district={listing.district}
              price={listing.price}
              rooms={listing.rooms}
              livingArea={listing.livingArea?.toNumber() ?? null}
              image={firstImage?.url ?? '/listing-image-placeholder.png'}
              imageOrigin={firstImage?.origin}
            />
          </li>
        );
      })}
    </ul>
  );
}
