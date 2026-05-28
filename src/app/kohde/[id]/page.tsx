import CarouselComponent from '@/app/components/carousel/carousel';
import PageContainer from '@/app/components/page-container/page-container';
import { getListingByPublicId } from '@/lib/listings';
import { notFound } from 'next/navigation';

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

  return (
    <PageContainer>
      <CarouselComponent images={listing.images ?? []} />
      <div>
        <h2>{location}</h2>
        {listing.price && <p>{listing.price.toLocaleString('fi-FI')} €</p>}
        {listing.rooms && <p>{listing.rooms}</p>}
        {listing.description && <p>{listing.description}</p>}
      </div>
    </PageContainer>
  );
}
