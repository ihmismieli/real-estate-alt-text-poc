import { prisma } from '@/lib/prisma';

export default async function ProtertyPage({ params }: { params: { id: string } }) {
  const listings = await prisma.listing.findMany({
    include: {
      images: true,
    },
  });

  return (
    <div>
      <h1>Property {params.id}</h1>
        <pre>{JSON.stringify(listings, null, 2)}</pre>
    </div>
  );
}