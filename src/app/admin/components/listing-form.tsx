'use client';

import { Text, Textarea, TextInput, Button, Group } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FiImage, FiUploadCloud, FiX } from 'react-icons/fi';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export type ListingFormData = {
  address?: string;
  postalCode?: string;
  district?: string;
  municipality?: string;
  price?: string;
  description?: string;
  apartmentType?: string;
  livingArea?: string;
  rooms?: string;
  images?: File[];
};

type ListingFormProps = {
  initialData: ListingFormData;
  onSubmit: (data: ListingFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isLoading?: boolean;
  resetAfterSubmit?: boolean;
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

function mergeFiles(previous: File[], next: File[]) {
  const merged = [...previous, ...next];

  return merged.filter(
    (file, index, self) =>
      index ===
      self.findIndex(
        (candidate) =>
          candidate.name === file.name &&
          candidate.size === file.size &&
          candidate.lastModified === file.lastModified
      )
  );
}

export default function ListingForm({
  initialData = emptyFormData,
  onSubmit,
  onCancel,
  submitLabel = 'Tallenna',
  isLoading = false,
  resetAfterSubmit = false,
}: ListingFormProps) {
  const form = useForm<ListingFormData>({
    mode: 'uncontrolled',
    initialValues: initialData,
    validate: {},
  });

  const [selectedImages, setSelectedImages] = useState<File[]>(
    initialData.images ?? []
  );
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleSubmit = async (values: ListingFormData) => {
    await onSubmit({
      ...values,
      images: selectedImages,
    });

    if (resetAfterSubmit) {
      form.reset();
      setSelectedImages([]);
      setFileInputKey((current) => current + 1);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ width: '100%', maxWidth: '800px' }}
    >
      <TextInput
        label="Osoite"
        placeholder="Osoite"
        mb="md"
        disabled={isLoading}
        key={form.key('address')}
        {...form.getInputProps('address')}
      />

      <TextInput
        label="Postinumero"
        placeholder="Postinumero"
        mb="md"
        disabled={isLoading}
        key={form.key('postalCode')}
        {...form.getInputProps('postalCode')}
      />

      <TextInput
        label="Kaupunginosa"
        placeholder="Kaupunginosa"
        mb="md"
        disabled={isLoading}
        key={form.key('district')}
        {...form.getInputProps('district')}
      />

      <TextInput
        label="Kunta"
        placeholder="Kunta/Kaupunki"
        mb="md"
        disabled={isLoading}
        key={form.key('municipality')}
        {...form.getInputProps('municipality')}
      />

      <TextInput
        label="Huoneiden lukumäärä"
        placeholder="3h + k"
        mb="md"
        disabled={isLoading}
        key={form.key('rooms')}
        {...form.getInputProps('rooms')}
      />

      <TextInput
        label="Asunnon tyyppi"
        placeholder="Kerrostalo"
        mb="md"
        disabled={isLoading}
        key={form.key('apartmentType')}
        {...form.getInputProps('apartmentType')}
      />

      <TextInput
        label="Asuinpinta-ala"
        type="number"
        placeholder="m²"
        mb="md"
        disabled={isLoading}
        key={form.key('livingArea')}
        {...form.getInputProps('livingArea')}
      />

      <TextInput
        label="Hinta"
        type="number"
        placeholder="€"
        mb="md"
        disabled={isLoading}
        key={form.key('price')}
        {...form.getInputProps('price')}
      />

      <Textarea
        label="Kuvaus"
        placeholder="Kuvaus"
        mb="md"
        autosize
        minRows={4}
        disabled={isLoading}
        key={form.key('description')}
        {...form.getInputProps('description')}
      />

      <div style={{ marginBottom: '1rem' }}>
        <Text size="sm" fw={500} mb="xs">
          Kuvat
        </Text>

        <Dropzone
          key={fileInputKey}
          onDrop={(files) => {
            setSelectedImages((previous) => mergeFiles(previous, files));
          }}
          onReject={(files) => {
            console.log('Rejected files', files);
          }}
          maxSize={4 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          multiple
          disabled={isLoading}
          styles={{
            root: {
              border: '2px dashed var(--mantine-color-gray-4)',
              borderRadius: '12px',
              padding: '10px',
            },
          }}
        >
          <Group
            justify="center"
            gap="xl"
            mih={180}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <FiUploadCloud size={48} color="var(--mantine-color-blue-6)" />
            </Dropzone.Accept>

            <Dropzone.Reject>
              <FiX size={48} color="var(--mantine-color-red-6)" />
            </Dropzone.Reject>

            <Dropzone.Idle>
              <FiImage size={48} color="var(--mantine-color-gray-6)" />
            </Dropzone.Idle>

            <div>
              <Text size="lg">Raahaa kuvat tähän tai klikkaa valitaksesi</Text>
              <Text size="sm" c="dimmed" mt={7}>
                Voit lisätä useita kuvia kerralla tai useassa erässä. Yhden
                kuvan maksimikoko on 4 MB.
              </Text>
            </div>
          </Group>
        </Dropzone>

        {selectedImages.length > 0 && (
          <div style={{ marginTop: '0.75rem' }}>
            <Text size="sm" fw={500}>
              {selectedImages.length} valittua kuvaa
            </Text>

            {selectedImages.map((file) => (
              <Text
                key={`${file.name}-${file.lastModified}`}
                size="sm"
                c="dimmed"
              >
                {file.name}
              </Text>
            ))}
          </div>
        )}
      </div>
      <Group justify="center" gap="md" mt="lg">
        <Button
          type="submit"
          color="black"
          loading={isLoading}
          disabled={isLoading}
        >
          {submitLabel}
        </Button>
        <Button onClick={onCancel} variant="light" disabled={isLoading}>
          Peruuta
        </Button>
      </Group>
    </form>
  );
}
