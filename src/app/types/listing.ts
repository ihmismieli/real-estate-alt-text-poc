type DateValue = Date | string;

export type ListingImage = {
    id: string;
    publicId: number;
    url: string;
    altText?: string | null;
    roomType?: string | null;
    createdAt: DateValue;
    updatedAt: DateValue;
    listingId: string;
};

export type Listing = {
    id: string;
    address?: string | null;
    postalCode?: string | null;
    district?: string | null;
    municipality?: string | null;
    price?: number | null;
    description?: string | null;
    apartmentType?: string | null;
    rooms?: string | null;
    livingArea?: number | null;
    createdAt: DateValue;
    updatedAt: DateValue;
    images?: ListingImage[];
};
