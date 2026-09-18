'use client';

import { Button, Group } from '@mantine/core';
import { useForm, schemaResolver } from '@mantine/form';
import { useState } from 'react';
import type { NewListingImage } from '@/app/types/listing';
import {
  listingFormSchema,
  type ListingFormType,
} from '@/app/schemas/listing-schema';
import ListingDetailsFields from '@/app/admin/components/listing-form/listing-details-fields';
import ListingImageUploader from '@/app/admin/components/listing-form/listing-image-uploader';

export type ListingFormData = ListingFormType & {
  images?: NewListingImage[];
};

export type SubmitResult =
  | { success: true }
  | { success: false; message: string };

type ListingFormProps = {
  initialData: ListingFormData;
  onSubmit: (data: ListingFormData) => Promise<SubmitResult>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  resetAfterSubmit?: boolean;
  showCancel?: boolean;
};

const emptyFormData: ListingFormData = {
  address: '',
  postalCode: '',
  district: '',
  municipality: '',
  price: '',
  description: '',
  apartmentType: '',
  livingArea: '',
  rooms: '',
  images: [],
};

export default function ListingForm({
  initialData = emptyFormData,
  onSubmit,
  onCancel,
  showCancel = false,
  submitLabel = 'Tallenna',
  isLoading = false,
  resetAfterSubmit = false,
}: ListingFormProps) {
  const form = useForm<ListingFormData>({
    mode: 'uncontrolled',
    initialValues: initialData,
    validateInputOnBlur: true,
    validate: schemaResolver(listingFormSchema, {
      sync: true,
    }),
  });

  const [selectedImages, setSelectedImages] = useState<NewListingImage[]>(
    initialData.images ?? []
  );

  const [fileInputKey, setFileInputKey] = useState(0);

  const handleFormSubmit = async (values: ListingFormData) => {
    const hasUnknownOrigin = selectedImages.some(
      (image) => image.origin === 'UNKNOWN'
    );

    if (hasUnknownOrigin) {
      const message = 'Valitse jokaiselle kuvalle alkuperä';

      form.setFieldError('images', message);
      return {
        success: false,
        message,
      };
    }

    const mainImage = selectedImages.filter(
      (image) => image.imageType === 'MAIN'
    );

    const floorPlanImage = selectedImages.filter(
      (image) => image.imageType === 'FLOOR_PLAN'
    );

    if (mainImage.length > 1) {
      const message = 'Kohteella voi olla vain yksi pääkuva';

      form.setFieldError('images', message);

      return {
        success: false,
        message,
      };
    }

    if (floorPlanImage.length > 1) {
      const message = 'Kohteella voi olla vain yksi pohjakuva';

      form.setFieldError('images', message);

      return {
        success: false,
        message,
      };
    }

    form.clearFieldError('images');

    const result = await onSubmit({
      ...values,
      images: selectedImages,
    });

    if (!result.success) {
      return;
    }

    if (resetAfterSubmit) {
      form.reset();
      setSelectedImages([]);
      setFileInputKey((current) => current + 1);
    }
    return result;
  };

  const handleFormCancel = () => {
    form.reset();
    setSelectedImages([]);
    setFileInputKey((current) => current + 1);
    onCancel();
  };

  return (
    <form
      onSubmit={form.onSubmit(handleFormSubmit)}
      style={{ width: '100%', maxWidth: '800px' }}
    >
      <ListingDetailsFields form={form} disabled={isLoading} />

      <ListingImageUploader
        images={selectedImages}
        onImagesChange={setSelectedImages}
        error={form.errors.images}
        onError={(message) => form.setFieldError('images', message)}
        disabled={isLoading}
        resetKey={fileInputKey}
      />

      <Group justify="center" gap="md" mt="lg">
        <Button
          type="submit"
          color="black"
          loading={isLoading}
          disabled={isLoading}
        >
          {submitLabel}
        </Button>

        {showCancel && (
          <Button
            onClick={handleFormCancel}
            variant="light"
            disabled={isLoading}
          >
            Peruuta
          </Button>
        )}
      </Group>
    </form>
  );
}
