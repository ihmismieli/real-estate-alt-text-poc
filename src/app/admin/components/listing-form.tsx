'use client';

import { Textarea, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

export type ListingFormData = {
  address?: string;
  postalCode?: string;
  district?: string;
  municipality?: string;
  price?: string;
  description?: string;
  apartmentType?: string;
  rooms?: string;
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
  rooms: '',
};

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

  const handleSubmit = async (values: ListingFormData) => {
    await onSubmit(values);
    if (resetAfterSubmit) {
      form.reset();
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
