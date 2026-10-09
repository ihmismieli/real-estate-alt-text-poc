'use client';

import {
  Group,
  Select,
  Text,
  Textarea,
  Stack,
  Image,
  Grid,
  Paper,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { FiImage, FiUploadCloud, FiX } from 'react-icons/fi';
import type {
  ImageOrigin,
  NewListingImage,
  ImageType,
} from '@/app/types/listing';
import { useEffect, useRef, type ReactNode } from 'react';

type ListingImageUploaderProps = {
  images: NewListingImage[];
  onImagesChange: (images: NewListingImage[]) => void;
  error?: ReactNode;
  onError: (message: string) => void;
  disabled: boolean;
  resetKey: number;
};

const IMAGE_TYPE_OPTIONS: {
  value: ImageType;
  label: string;
}[] = [
  {
    value: 'MAIN',
    label: 'Pääkuva',
  },
  {
    value: 'FLOOR_PLAN',
    label: 'Pohjakuva',
  },
  {
    value: 'OTHER',
    label: 'Muu',
  },
];

const IMAGE_ORIGIN_OPTIONS: {
  value: ImageOrigin;
  label: string;
}[] = [
  {
    value: 'REAL_IMAGE',
    label: 'Oikea valokuva',
  },
  {
    value: 'AI_BASIC',
    label: 'AI-kuva, perustaso',
  },
  {
    value: 'AI_GENERATED',
    label: 'Tekoälyn luoma kuva',
  },
  {
    value: 'AI_EDITED',
    label: 'Tekoälyllä muokattu kuva',
  },
  {
    value: 'UNKNOWN',
    label: 'Tuntematon',
  },
];

function mergeFiles(
  previous: NewListingImage[],
  next: File[]
): NewListingImage[] {
  const newImages: NewListingImage[] = next.map((file) => ({
    file,
    origin: 'UNKNOWN',
    imageType: 'OTHER',
    altText: '',
  }));

  return [...previous, ...newImages].filter(
    (image, index, allImages) =>
      index ===
      allImages.findIndex(
        (candidate) =>
          candidate.file.name === image.file.name &&
          candidate.file.size === image.file.size &&
          candidate.file.lastModified === image.file.lastModified
      )
  );
}

function SelectedImagePreview({ file }: { file: File }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    if (!imageElement) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    imageElement.src = objectUrl;

    return () => {
      imageElement.removeAttribute('src');
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <Image
      ref={imageRef}
      alt={`Esikatselu tiedostosta ${file.name}`}
      w="100%"
      maw={220}
      h={150}
      radius="sm"
      fit="contain"
      loading="lazy"
    />
  );
}

export default function ListingImageUploader({
  images,
  onImagesChange,
  error,
  onError,
  disabled,
  resetKey,
}: ListingImageUploaderProps) {
  const handleImageOriginChange = (file: File, value: string | null) => {
    const selectedOption = IMAGE_ORIGIN_OPTIONS.find(
      (option) => option.value === value
    );

    if (!selectedOption) {
      return;
    }

    onImagesChange(
      images.map((image) =>
        image.file === file
          ? {
              ...image,
              origin: selectedOption.value,
            }
          : image
      )
    );
  };

  const handleImageTypeChange = (file: File, value: ImageType) => {
    onImagesChange(
      images.map((image) =>
        image.file === file
          ? {
              ...image,
              imageType: value,
            }
          : image
      )
    );
  };

  const handleImageAltTextChange = (file: File, altText: string) => {
    onImagesChange(
      images.map((image) =>
        image.file === file
          ? {
              ...image,
              altText,
            }
          : image
      )
    );
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Text size="sm" fw={500} mb="xs">
        Kuvat
      </Text>

      <Dropzone
        key={resetKey}
        onDrop={(files) => {
          onImagesChange(mergeFiles(images, files));
        }}
        onReject={() => {
          onError('Tiedosto ei ole kelvollinen kuva tai se on liian suuri');
        }}
        maxSize={4 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple
        disabled={disabled}
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
              Voit lisätä useita kuvia kerralla tai useassa erässä. Yhden kuvan
              maksimikoko on 4 MB.
            </Text>
          </div>
        </Group>
      </Dropzone>

      {images.length > 0 && (
        <div style={{ marginTop: '0.75rem' }}>
          <Text size="sm" fw={500}>
            {images.length} valittua kuvaa
          </Text>

          {images.map(({ file, origin, imageType, altText }, index) => (
            <Paper
              key={`${file.name}-${file.size}-${file.lastModified}`}
              mt="md"
              p="md"
              withBorder
              radius="md"
            >
              <Text fw={600} mb="md">
                Kuva {index + 1}
              </Text>

              <Grid gap="xl" align="start">
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <Stack>
                    <Group grow align="end">
                      <Select
                        label="Alkuperä"
                        value={origin}
                        onChange={(value) =>
                          handleImageOriginChange(file, value)
                        }
                        data={IMAGE_ORIGIN_OPTIONS}
                        disabled={disabled}
                      />

                      <Select
                        label="Kuvatyyppi"
                        value={imageType}
                        onChange={(value) => {
                          if (
                            value === 'MAIN' ||
                            value === 'FLOOR_PLAN' ||
                            value === 'OTHER'
                          ) {
                            handleImageTypeChange(file, value);
                          }
                        }}
                        data={IMAGE_TYPE_OPTIONS}
                        disabled={disabled}
                      />
                    </Group>

                    <Textarea
                      label="Tekstivastine (valinnainen)"
                      value={altText ?? ''}
                      onChange={(event) =>
                        handleImageAltTextChange(
                          file,
                          event.currentTarget.value
                        )
                      }
                      autosize
                      minRows={3}
                      disabled={disabled}
                    />
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Stack align="center" gap="xs">
                    <SelectedImagePreview file={file} />

                    <Text
                      size="xs"
                      c="dimmed"
                      ta="center"
                      lineClamp={2}
                      title={file.name}
                      style={{ overflowWrap: 'anywhere' }}
                    >
                      {file.name}
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Paper>
          ))}

          {error && (
            <Text c="red" size="sm" mt="xs">
              {error}
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
