'use client';

import { Button, Group, Select } from '@mantine/core';
import { useForm, schemaResolver } from '@mantine/form';
import { useState } from 'react';
import type { NewListingImage } from '@/app/types/listing-types';
import {
  listingFormSchema,
  type ListingFormType,
} from '@/app/schemas/listing-schema';
import ListingDetailsFields from '@/app/admin/components/listing-form/listing-details-fields';
import ListingImageUploader from '@/app/admin/components/listing-form/listing-image-uploader';
import {
  ALT_TEXT_MODEL_OPTIONS,
  DEFAULT_ALT_TEXT_MODEL,
  isAltTextModel,
} from '@/lib/alt-text/models';
import type { AiModel } from '@/app/types/alt-text-types';

export type ListingFormData = ListingFormType & {
  images?: NewListingImage[];
  altTextModel?: AiModel;
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

  const [selectedAltTextModel, setSelectedAltTextModel] = useState<AiModel>(
    initialData.altTextModel ?? DEFAULT_ALT_TEXT_MODEL
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

    if (mainImage.length > 1) {
      const message = 'Kohteella voi olla vain yksi pääkuva';

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
      altTextModel: selectedAltTextModel,
    });

    if (!result.success) {
      return;
    }

    setSelectedImages([]);
    setFileInputKey((current) => current + 1);

    if (resetAfterSubmit) {
      form.reset();
      setSelectedAltTextModel(DEFAULT_ALT_TEXT_MODEL);
    }
    return result;
  };

  const handleFormCancel = () => {
    form.reset();
    setSelectedAltTextModel(DEFAULT_ALT_TEXT_MODEL);
    setSelectedImages([]);
    setFileInputKey((current) => current + 1);
    onCancel();
  };

  return (
    <form
      onSubmit={form.onSubmit(handleFormSubmit)}
      style={{ width: '100%', maxWidth: '800px', marginBottom: '30px' }}
    >
      <ListingDetailsFields form={form} disabled={isLoading} />

      <Select
        label="Tekstivastineiden generointimalli"
        description="Valittua mallia käytetään uusille kuville, joiden tekstivastine puuttuu."
        data={ALT_TEXT_MODEL_OPTIONS}
        value={selectedAltTextModel}
        onChange={(value) => {
          if (isAltTextModel(value)) {
            setSelectedAltTextModel(value);
          }
        }}
        allowDeselect={false}
        clearable={false}
        disabled={isLoading}
        mb="md"
      />

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
