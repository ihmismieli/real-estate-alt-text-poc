'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageContainer from '@/app/components/page-container/page-container';
import ListingForm, {
  type ListingFormData,
  type SubmitResult,
} from '@/app/admin/components/listing-form/listing-form';
import {
  updateListing,
  uploadListingImages,
} from '@/app/admin/utils/listing-api';
import { useListing } from '@/app/admin/hooks/use-listing';
import LoadingIndicator from '@/app/components/loading/loading';
import { notifications } from '@mantine/notifications';
import ExistingImages from '@/app/admin/components/listing-images/existing-images';
import AdminPageHeader from '@/app/admin/components/admin-page-header/admin-page-header';

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { listing, error, isLoading, mutate } = useListing(id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ListingFormData): Promise<SubmitResult> => {
    setIsSubmitting(true);

    try {
      await updateListing(id, data);

      if (data.images && data.images.length > 0) {
        await uploadListingImages(id, data.images);
      }

      notifications.show({
        message: 'Kohde päivitetty onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });

      router.push('/admin');
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
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <AdminPageHeader title="Muokkaa kohdetta" />

        <PageContainer>
          <LoadingIndicator />
        </PageContainer>
      </>
    );
  }

  if (error || !listing) {
    return (
      <PageContainer>
        <p>{error ? error.message : 'Kohdetta ei löytynyt'}</p>
      </PageContainer>
    );
  }

  const formData: ListingFormData = {
    address: listing.address || '',
    postalCode: listing.postalCode || '',
    district: listing.district || '',
    municipality: listing.municipality || '',
    price: listing.price?.toString() || '',
    description: listing.description || '',
    apartmentType: listing.apartmentType || '',
    rooms: listing.rooms || '',
    livingArea: listing.livingArea?.toString() || '',
  };

  return (
    <>
      <AdminPageHeader title="Muokkaa kohdetta" />
      <PageContainer>
        <ListingForm
          initialData={formData}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin')}
          submitLabel="Tallenna muutokset"
          isLoading={isSubmitting}
          showCancel={true}
        />
        <h2>Tallennetut kuvat</h2>

        <ExistingImages
          listingId={id}
          images={listing.images ?? []}
          onImagesChange={async () => {
            await mutate();
          }}
        />
      </PageContainer>
    </>
  );
}
