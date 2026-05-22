'use client';

import PageContainer from '../components/page-container/page-container';
import { useState } from 'react';
import styles from './page.module.css';
import ListingForm, { ListingFormData } from './components/listing-form';
import ListingGrid from './components/listing-grid';
import { createListing, deleteListing } from './utils/listing-api';
import { useListings } from './hooks/use-listings';
import LoadingIndicator from '../components/loading/loading';
import { notifications } from '@mantine/notifications';

export default function AdminPage() {
  const { listings, error, isLoading, mutate } = useListings();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateListing = async (formData: ListingFormData) => {
    setIsCreating(true);

    try {
      await createListing(formData);
      await mutate();
      notifications.show({
        message: 'Kohde luotu onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });
    } catch (err) {
      notifications.show({
        message: err instanceof Error ? err.message : 'Tuntematon virhe',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm('Oletko varma, että haluat poistaa tämän kohteen?')) {
      return;
    }

    try {
      await deleteListing(id);
      await mutate();
      notifications.show({
        message: 'Kohde poistettu onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });
    } catch (err) {
      notifications.show({
        message: err instanceof Error ? err.message : 'Tuntematon virhe',
        color: 'red',
        autoClose: 5000,
      });
    }
  };

  return (
    <PageContainer>
      <h1>Hallinnoi kohteita</h1>

      <div className={styles.form}>
        <h2>Luo uusi kohde</h2>
        <ListingForm
          initialData={{
            address: '',
            postalCode: '',
            district: '',
            municipality: '',
            price: '',
            description: '',
            apartmentType: '',
            rooms: '',
          }}
          onSubmit={handleCreateListing}
          onCancel={() => {}}
          submitLabel="Luo kohde"
          isLoading={isCreating}
          resetAfterSubmit
        />
      </div>

      <h2 style={{ marginTop: '2rem' }}>Kohteet</h2>

      {isLoading && <LoadingIndicator />}
      {error && <p>Kohteiden lataaminen epäonnistui</p>}
      {!isLoading && !error && (
        <ListingGrid listings={listings} onDelete={handleDeleteListing} />
      )}
    </PageContainer>
  );
}
