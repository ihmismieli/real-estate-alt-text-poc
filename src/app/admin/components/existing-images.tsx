'use client';

import { useEffect, useState } from 'react';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FiX } from 'react-icons/fi';
import { ListingImage } from '@/app/types/listing';
import {
  deleteListingImage,
  updateListingImageAltText,
} from '../utils/listing-api';

type ExistingImageProps = {
  listingId: string;
  images: ListingImage[];
  onImagesChange: () => Promise<void>;
};

export default function ExistingImagesEditor({
  listingId,
  images,
  onImagesChange,
}: ExistingImageProps) {
  const [altTexts, setAltTexts] = useState(() =>
    Object.fromEntries(images.map((image) => [image.id, image.altText ?? '']))
  );
  const [savingImageId, setSavingImageId] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  useEffect(() => {
    setAltTexts(
      Object.fromEntries(images.map((image) => [image.id, image.altText ?? '']))
    );
  }, [images]);

  const handleAltTextChange = (imageId: string, value: string) => {
    setAltTexts((current) => ({
      ...current,
      [imageId]: value,
    }));
  };

  const handleSaveAltText = async (
    imageId: string,
    nextAltText?: string | null
  ) => {
    const value =
      nextAltText === undefined ? (altTexts[imageId] ?? '') : nextAltText;

    setSavingImageId(imageId);

    try {
      await updateListingImageAltText(listingId, imageId, value);
      await onImagesChange();

      setAltTexts((current) => ({
        ...current,
        [imageId]: value ?? '',
      }));

      notifications.show({
        message:
          value === null || !value.trim()
            ? 'Tekstivastine poistettu onnistuneesti'
            : 'Tekstivastine päivitetty onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });
    } catch (err) {
      notifications.show({
        message: err instanceof Error ? err.message : 'Tuntematon virhe',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setSavingImageId(null);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Oletko varma, että haluat poistaa tämän kuvan?')) {
      return;
    }

    setDeletingImageId(imageId);

    try {
      await deleteListingImage(listingId, imageId);
      await onImagesChange();

      notifications.show({
        message: 'Kuva poistettu onnistuneesti',
        color: 'green',
        autoClose: 5000,
      });
    } catch (err) {
      notifications.show({
        message: err instanceof Error ? err.message : 'Tuntematon virhe',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setDeletingImageId(null);
    }
  };

  if (images.length === 0) {
    return <Text c="dimmed">Kohteella ei ole vielä kuvia.</Text>;
  }

  return (
    <Stack gap="lg" style={{ width: '100%', maxWidth: '800px' }}>
      {images.map((image, index) => {
        const currentAltText = altTexts[image.id] ?? '';
        const originalAltText = image.altText ?? '';

        return (
          <Group key={image.id} align="center" wrap="wrap">
            <Box pos="relative" w={320}>
              <Image
                src={image.url}
                alt={image.altText ?? `Kohteen kuva ${index + 1}`}
                w={320}
                h={250}
                fit="cover"
                radius="sm"
              />

              <ActionIcon
                pos="absolute"
                top={6}
                right={6}
                size="sm"
                color="red"
                variant="filled"
                disabled={deletingImageId === image.id}
                onClick={() => handleDeleteImage(image.id)}
                aria-label={`Poista kuva ${index + 1}`}
              >
                <FiX aria-hidden="true" />
              </ActionIcon>
            </Box>

            <Stack gap="xs" style={{ flex: 1, minWidth: 300 }}>
              <Textarea
                label={`Kuva ${index + 1} tekstivastine`}
                placeholder="Kuvan tekstivastine"
                value={currentAltText}
                onChange={(event) =>
                  handleAltTextChange(image.id, event.currentTarget.value)
                }
                autosize
                minRows={7}
              />

              <Group justify="flex-start">
                <Button
                  type="button"
                  size="xs"
                  variant="light"
                  loading={savingImageId === image.id}
                  onClick={() => handleSaveAltText(image.id)}
                >
                  Tallenna tekstivastine
                </Button>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  color="red"
                  disabled={
                    !originalAltText.trim() || savingImageId === image.id
                  }
                  onClick={() => handleSaveAltText(image.id, null)}
                >
                  Poista tekstivastine
                </Button>
              </Group>
            </Stack>
          </Group>
        );
      })}
    </Stack>
  );
}
