import { Group, Stack, Text } from '@mantine/core';

type ListingSummaryProps = {
  price?: number | null;
  rooms?: string | null;
  livingArea?: number | null;
};

export default function ListingDetails({
  price,
  rooms,
  livingArea,
}: ListingSummaryProps) {
  return (
    <Group gap="xl" align="flex-start" wrap="wrap" justify="space-around">
      <Stack gap={2}>
        <Text size="sm">Hinta</Text>

        <Text fw={700} size="lg">
          {price ? `${price.toLocaleString('fi-FI')} €` : '-'}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Text size="sm">Huoneet</Text>

        <Text fw={700} size="lg">
          {rooms ?? '-'}
        </Text>
      </Stack>

      <Stack gap={2}>
        <Text size="sm">Pinta-ala</Text>

        <Text fw={700} size="lg">
          {livingArea != null
            ? `${livingArea.toLocaleString('fi-FI')} m²`
            : '-'}
        </Text>
      </Stack>
    </Group>
  );
}
