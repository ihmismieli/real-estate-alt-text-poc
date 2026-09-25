import CarouselComponent from '@/app/components/carousel/carousel';
import PageContainer from '@/app/components/page-container/page-container';
import { getListingByPublicId } from '@/lib/listings';
import { notFound } from 'next/navigation';
import { VisuallyHidden, Box } from '@mantine/core';
import Image from 'next/image';
import ListingDetails from '@/app/components/listing-details/listing-details';
import { Text, Center } from '@mantine/core';

export default async function ProtertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publicId = Number(id);

  if (Number.isNaN(publicId)) {
    notFound();
  }

  const listing = await getListingByPublicId(publicId);

  if (!listing) {
    notFound();
  }

  const location = [listing.address, listing.district, listing.municipality]
    .filter(Boolean)
    .join(', ');

  const floorPlanImage = listing.images?.find(
    (image) => image.imageType === 'FLOOR_PLAN'
  );

  return (
    <PageContainer>
      <Box w="100%" maw={800} mt={'xl'}>
        <section>
          <VisuallyHidden component="h2" id="listing-images-heading">
            Kohteen kuvat
          </VisuallyHidden>

          <CarouselComponent
            images={listing.images ?? []}
            labelledBy="listing-images-heading"
          />
        </section>

        <section aria-label="Kohteen tiedot">
          <h1 id="listing-details-heading">{location}</h1>

          <ListingDetails
            price={listing.price}
            rooms={listing.rooms}
            livingArea={listing.livingArea?.toNumber() ?? null}
          />

          {listing.description && (
            <Text component="p" w="100%" mt="xl">
              {listing.description}
            </Text>
          )}
        </section>

        <section aria-labelledby="floor-plan-heading">
          <h2 id="floor-plan-heading">Pohjakuva</h2>

          {floorPlanImage && (
            <Center w="100%">
              <Image
                src={floorPlanImage?.url ?? ''}
                alt={floorPlanImage?.altText ?? 'Kohteen pohjakuva'}
                width={600}
                height={400}
              />
            </Center>
          )}
        </section>
      </Box>
    </PageContainer>
  );
}
