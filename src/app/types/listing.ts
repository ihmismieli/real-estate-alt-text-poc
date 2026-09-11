type DateValue = Date | string;

export type ImageOrigin =
    | 'REAL_IMAGE'
    | 'AI_BASIC'
    | 'AI_GENERATED'
    | 'AI_EDITED'
    | 'UNKNOWN';

/**
 * Image in the process of being uploaded on admin panel, not yet stored in the database.
 */
export type NewListingImage = {
    file: File;
    origin: ImageOrigin;
};

export type ListingImage = {
    id: string;
    url: string;
    storageKey?: string | null;
    originalFilename?: string | null;
    mimeType?: string | null;
    width?: number | null;
    height?: number | null;
    altText?: string | null;
    roomType?: string | null;
    origin?: ImageOrigin | null;
    createdAt: DateValue;
    updatedAt: DateValue;
    listingId: string;
};

export type Listing = {
    id: string;
    publicId: number;
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
