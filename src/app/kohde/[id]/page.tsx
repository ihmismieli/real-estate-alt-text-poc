import CarouselComponent from '@/app/components/carousel/carousel';
import PageContainer from '@/app/components/page-container/page-container';
import { prisma } from '@/lib/prisma';

export default async function ProtertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listings = await prisma.listing.findMany({
    include: {
      images: true,
    },
  });

  return (
    <PageContainer>
      <h1>Property {id}</h1>
      <pre>{JSON.stringify(listings, null, 2)}</pre>
      <CarouselComponent />
    </PageContainer>
  );
}
