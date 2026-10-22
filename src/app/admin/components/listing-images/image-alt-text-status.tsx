import { Text, Group, Loader } from '@mantine/core';
import type { ListingImage } from '@/app/types/listing-types';
import { ALT_TEXT_MODEL_OPTIONS } from '@/lib/alt-text/models';

type ImageAltTextStatus = {
  image: ListingImage;
};

function getStatusMessage(image: ListingImage): string | null {
  switch (image.altTextStatus) {
    case 'PROCESSING':
      return (
        'Tekstivastinetta luodaan… ' +
        'Voit myös kirjoittaa ja tallentaa oman tekstin.'
      );

    case 'COMPLETED': {
      const generatedModel = image.altTextGenerations?.[0]?.model;

      if (!generatedModel) {
        return 'Tekstivastine luotu tekoälyllä. Tarkista sen sisältö.';
      }

      const modelOption = ALT_TEXT_MODEL_OPTIONS.find(
        (option) => option.value === generatedModel
      );

      const modelLabel = modelOption?.label ?? generatedModel;

      return `Tekstivastine luotu tekoälyllä, mallina ${modelLabel}. Tarkista sen sisältö.`;
    }

    case 'FAILED':
      return (
        'Automaattinen luonti ei valmistunut. ' +
        'Voit kirjoittaa tekstivastineen itse.'
      );

    case 'IDLE':
      if (image.altTextSource === 'MANUAL') {
        return 'Käyttäjän tallentama tekstivastine.';
      }

      return null;

    default:
      return null;
  }
}

export default function ImageAltTextStatus({ image }: ImageAltTextStatus) {
  const message = getStatusMessage(image);

  if (!message) {
    return null;
  }

  return (
    <Group gap="xs" align="center" wrap="nowrap">
      <Text size="sm" role="status">
        {message}
      </Text>

      {image.altTextStatus === 'PROCESSING' && (
        <Loader
          size="xs"
          aria-hidden="true"
          color="var(--loading-indicator-color)"
        />
      )}
    </Group>
  );
}
