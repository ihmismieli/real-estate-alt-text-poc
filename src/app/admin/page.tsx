'use client';

import PageContainer from '@/app/components/page-container/page-container';
import { useState } from 'react';
import ListingForm, {
  type ListingFormData,
  type SubmitResult,
} from '@/app/admin/components/listing-form/listing-form';
import ListingGrid from '@/app/admin/components/listing-grid/listing-grid';
import {
  createListing,
  deleteListing,
  uploadListingImages,
} from '@/app/admin/utils/listing-api';
import { useListings } from '@/app/admin/hooks/use-listings';
import LoadingIndicator from '@/app/components/loading/loading';
import { notifications } from '@mantine/notifications';
import AdminPageHeader from './components/admin-page-header/admin-page-header';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { listings, error, isLoading, mutate } = useListings();
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateListing = async (
    formData: ListingFormData
  ): Promise<SubmitResult> => {
    setIsCreating(true);

    try {
      const listing = await createListing(formData);

      if (formData.images && formData.images.length > 0) {
        await uploadListingImages(listing.id, formData.images);
      }

      await mutate();

      notifications.show({
        message: 'Luonnos tallennettu onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });
      router.push(`/admin/listings/${listing.id}`);
      return { success: true };
    } catch (err) {
      notifications.show({
        message: err instanceof Error ? err.message : 'Tuntematon virhe',
        color: 'red',
        autoClose: 5000,
      });
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Tuntematon virhe',
      };
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
    <>
      <AdminPageHeader title="Hallinnoi kohteita" />

      <PageContainer>
        <div>
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
              livingArea: '',
            }}
            onSubmit={handleCreateListing}
            onCancel={() => {}}
            submitLabel="Tallenna luonnos"
            isLoading={isCreating}
            resetAfterSubmit
            showCancel
          />
        </div>

        <h2 style={{ marginTop: '2rem' }}>Kohteet</h2>

        {isLoading && <LoadingIndicator />}
        {error && <p>Kohteiden lataaminen epäonnistui</p>}
        {!isLoading && !error && (
          <ListingGrid listings={listings} onDelete={handleDeleteListing} />
        )}
      </PageContainer>
    </>
  );
}
