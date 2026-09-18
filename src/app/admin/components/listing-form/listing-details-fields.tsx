'use client';

import { Textarea, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { ListingFormData } from './listing-form';

type ListingDetailsFieldsProps = {
  form: UseFormReturnType<ListingFormData>;
  disabled: boolean;
};

export default function ListingDetailsFields({
  form,
  disabled,
}: ListingDetailsFieldsProps) {
  return (
    <>
      <TextInput
        label="Osoite"
        placeholder="Osoite"
        mb="md"
        disabled={disabled}
        key={form.key('address')}
        {...form.getInputProps('address')}
      />

      <TextInput
        label="Postinumero"
        placeholder="Postinumero"
        mb="md"
        disabled={disabled}
        key={form.key('postalCode')}
        {...form.getInputProps('postalCode')}
      />

      <TextInput
        label="Kaupunginosa"
        placeholder="Kaupunginosa"
        mb="md"
        disabled={disabled}
        key={form.key('district')}
        {...form.getInputProps('district')}
      />

      <TextInput
        label="Kunta"
        placeholder="Kunta/Kaupunki"
        mb="md"
        disabled={disabled}
        key={form.key('municipality')}
        {...form.getInputProps('municipality')}
      />

      <TextInput
        label="Huoneiden lukumäärä"
        placeholder="3h + k"
        mb="md"
        disabled={disabled}
        key={form.key('rooms')}
        {...form.getInputProps('rooms')}
      />

      <TextInput
        label="Asunnon tyyppi"
        placeholder="Kerrostalo"
        mb="md"
        disabled={disabled}
        key={form.key('apartmentType')}
        {...form.getInputProps('apartmentType')}
      />

      <TextInput
        label="Asuinpinta-ala"
        type="number"
        placeholder="m²"
        mb="md"
        disabled={disabled}
        key={form.key('livingArea')}
        {...form.getInputProps('livingArea')}
      />

      <TextInput
        label="Hinta"
        type="number"
        placeholder="€"
        mb="md"
        disabled={disabled}
        key={form.key('price')}
        {...form.getInputProps('price')}
      />

      <Textarea
        label="Kuvaus"
        placeholder="Kuvaus"
        mb="md"
        autosize
        minRows={4}
        disabled={disabled}
        key={form.key('description')}
        {...form.getInputProps('description')}
      />
    </>
  );
}
