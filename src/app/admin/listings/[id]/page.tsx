'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageContainer from '../../../components/page-container/page-container';
import ListingForm, { ListingFormData } from '../../components/listing-form';
import { updateListing } from '../../utils/listing-api';
import { useListing } from '../../hooks/use-listing';
import LoadingIndicator from '@/app/components/loading/loading';
import { notifications } from '@mantine/notifications';

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { listing, error, isLoading } = useListing(id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);

    try {
      await updateListing(id, data);
      notifications.show({
        message: 'Kohde päivitetty onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });
      router.push('/admin');
    } catch (err) {
      notifications.show({
        message: err instanceof Error ? err.message : 'Tuntematon virhe',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingIndicator />
      </PageContainer>
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
    title: listing.title,
    description: listing.description || '',
    price: listing.price?.toString() || '',
    address: listing.address || '',
  };

  return (
    <PageContainer>
      <h1>Muokkaa kohdetta</h1>
      <ListingForm
        initialData={formData}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin')}
        submitLabel="Tallenna muutokset"
        isLoading={isSubmitting}
      />
    </PageContainer>
  );
}
