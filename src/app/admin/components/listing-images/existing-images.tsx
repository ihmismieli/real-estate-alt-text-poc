'use client';

import { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Image,
  Stack,
  Text,
  Textarea,
  Grid,
  SimpleGrid,
  Paper,
  AspectRatio,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FiX } from 'react-icons/fi';
import { ListingImage } from '@/app/types/listing';
import {
  deleteListingImage,
  updateListingImageAltText,
} from '@/app/admin/utils/listing-api';

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
    setAltTexts((current) => {
      const next = { ...current };

      for (const image of images) {
        if (!(image.id in next)) {
          next[image.id] = image.altText ?? '';
        }
      }

      return next;
    });
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

      setAltTexts((current) => ({
        ...current,
        [imageId]: value ?? '',
      }));

      await onImagesChange();

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

      setAltTexts((current) => {
        const next = { ...current };
        delete next[imageId];
        return next;
      });

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
        const savedAltText = image.altText ?? '';
        const notFinishedAltText = currentAltText !== savedAltText;

        return (
          <Paper key={image.id} withBorder radius="md" p="md">
            <Group justify="space-between" align="center" mb="md">
              <Text component="h3" size="md" fw={600} m={0}>
                Kuva {index + 1}
              </Text>

              <ActionIcon
                size="lg"
                color="red"
                variant="light"
                disabled={deletingImageId === image.id}
                onClick={() => handleDeleteImage(image.id)}
                aria-label={`Poista kuva ${index + 1}`}
              >
                <FiX aria-hidden="true" />
              </ActionIcon>
            </Group>

            <Grid gap="lg" align="start">
              <Grid.Col span={{ base: 12, sm: 5, md: 4 }}>
                <Paper bg="gray.0" radius="sm">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={image.url}
                      alt={image.altText ?? `Kohteen kuva ${index + 1}`}
                      fit="cover"
                    />
                  </AspectRatio>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 7, md: 8 }}>
                <Stack gap="md">
                  <Textarea
                    label="Tekstivastine (valinnainen)"
                    placeholder="Kirjoita kuvan tekstivastine"
                    value={currentAltText}
                    onChange={(event) =>
                      handleAltTextChange(image.id, event.currentTarget.value)
                    }
                    autosize
                    minRows={5}
                    maxRows={9}
                    lang="fi"
                  />

                  <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
                    <Button
                      type="button"
                      size="sm"
                      variant="light"
                      fullWidth
                      loading={savingImageId === image.id}
                      disabled={
                        !notFinishedAltText ||
                        savingImageId !== null ||
                        deletingImageId !== null
                      }
                      onClick={() => handleSaveAltText(image.id)}
                    >
                      Tallenna tekstivastine
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      color="red"
                      fullWidth
                      disabled={
                        !savedAltText.trim() ||
                        savingImageId !== null ||
                        deletingImageId !== null
                      }
                      onClick={() => handleSaveAltText(image.id, null)}
                    >
                      Poista tekstivastine
                    </Button>
                  </SimpleGrid>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        );
      })}
    </Stack>
  );
}
