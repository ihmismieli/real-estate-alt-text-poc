'use client';

import { Textarea, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

export type ListingFormData = {
  title: string;
  description: string;
  price: string;
  address: string;
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
  title: '',
  description: '',
  price: '',
  address: '',
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
    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Otsikko on pakollinen' : null,
    },
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
        label="Otsikko"
        placeholder="Otsikko"
        required
        mb="md"
        disabled={isLoading}
        key={form.key('title')}
        {...form.getInputProps('title')}
      />

      <TextInput
        label="Osoite"
        placeholder="Osoite"
        mb="md"
        disabled={isLoading}
        key={form.key('address')}
        {...form.getInputProps('address')}
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
