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
  publishListing,
} from '@/app/admin/utils/listing-api';
import { useListing } from '@/app/admin/hooks/use-listing';
import LoadingIndicator from '@/app/components/loading/loading';
import { notifications } from '@mantine/notifications';
import ExistingImages from '@/app/admin/components/listing-images/existing-images';
import AdminPageHeader from '@/app/admin/components/admin-page-header/admin-page-header';
import Link from 'next/link';
import { Badge, Button, Group, Text } from '@mantine/core';
import { useSWRConfig } from 'swr';

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { listing, error, isLoading, mutate } = useListing(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: mutateCache } = useSWRConfig();
  const [isPublishing, setIsPublishing] = useState(false);

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

      await mutate();
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

  const handlePublish = async () => {
    if (!listing || isPublishing || isSubmitting) {
      return;
    }

    const confirmed = window.confirm(
      'Julkaistaanko kohteen viimeksi tallennettu versio? ' +
        'Varmista, että olet tallentanut kohteen tiedot ja kuvien tekstivastineet.'
    );

    if (!confirmed) {
      return;
    }

    setIsPublishing(true);

    try {
      const published = await publishListing(id);

      // Update this editor immediately without waiting for another GET request.
      await mutate(
        (current) =>
          current ? { ...current, status: published.status } : current,
        { revalidate: false }
      );

      notifications.show({
        message: 'Kohde julkaistu onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });

      void mutateCache('/api/admin/listings').catch((error) => {
        console.error('Failed to refresh admin listings:', error);
      });
    } catch (err) {
      notifications.show({
        message:
          err instanceof Error
            ? err.message
            : 'Kohteen julkaiseminen epäonnistui',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setIsPublishing(false);
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
        <Group mb="md">
          <Text fw={500}>Kohteen tila</Text>

          <Badge
            color={listing.status === 'DRAFT' ? 'yellow' : 'green'}
            variant="light"
          >
            {listing.status === 'DRAFT' ? 'Luonnos' : 'Julkaistu'}
          </Badge>
        </Group>

        {listing.status === 'DRAFT' && (
          <Text size="sm" mb="md">
            Kohde näkyy vain hallinnassa. Tallenna ja tarkista tiedot sekä
            kuvien tekstivastineet ennen julkaisemista.
          </Text>
        )}
        <ListingForm
          initialData={formData}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin')}
          submitLabel={
            listing.status === 'DRAFT'
              ? 'Tallenna luonnos'
              : 'Tallenna muutokset'
          }
          isLoading={isSubmitting || isPublishing}
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
        <Group mt="xl">
          {listing.status === 'DRAFT' ? (
            <Button
              type="button"
              color="green"
              loading={isPublishing}
              disabled={isSubmitting || isPublishing}
              onClick={handlePublish}
            >
              Julkaise kohde
            </Button>
          ) : (
            <Button
              component={Link}
              href={`/kohde/${listing.publicId}`}
              prefetch={false}
              variant="light"
            >
              Avaa julkinen kohdesivu
            </Button>
          )}
        </Group>
      </PageContainer>
    </>
  );
}
