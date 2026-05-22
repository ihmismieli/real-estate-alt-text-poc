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
    createdAt: Date;
    updatedAt: Date;
};
