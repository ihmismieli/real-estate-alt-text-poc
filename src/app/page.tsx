import styles from './page.module.css';
import CardComponent from './components/card/card';
import { listings } from './mock/mock-listings';
import PageContainer from './components/page-container/page-container';

export default function Home() {
  return (
    <PageContainer>
      <h1>Myytävät kohteet</h1>
      <div className={styles.cards}>
        {listings.map((listing) => (
          <CardComponent
            key={listing.id}
            id={listing.id}
            title={listing.title}
            price={listing.price}
            image={listing.images[0]}
          />
        ))}
      </div>
    </PageContainer>
  );
}
