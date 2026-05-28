export async function createListing(data: {
    address?: string;
    postalCode?: string;
    district?: string;
    municipality?: string;
    price?: string;
    description?: string;
    apartmentType?: string;
    rooms?: string;
}) {
    const res = await fetch('/api/admin/listings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: data.address,
            postalCode: data.postalCode,
            district: data.district,
            municipality: data.municipality,
            description: data.description,
            price: data.price ? parseInt(data.price, 10) : null,
            apartmentType: data.apartmentType,
            rooms: data.rooms,
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Kohteen luonti epäonnistui');
    }

    return res.json();
}

export async function uploadListingImages(listingId: string, images: File[]) {
    if (images.length === 0) {
        return [];
    }

    const formData = new FormData();

    for (const image of images) {
        formData.append('images', image);
    }

    const res = await fetch(`/api/admin/listings/${listingId}/images`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Kuvien lataus epäonnistui');
    }

    return res.json();
}

export async function updateListing(
    id: string,
    data: {
        address?: string;
        postalCode?: string;
        district?: string;
        municipality?: string;
        price?: string;
        description?: string;
        apartmentType?: string;
        rooms?: string;
    }
) {
    const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: data.address,
            postalCode: data.postalCode,
            district: data.district,
            municipality: data.municipality,
            description: data.description,
            price: data.price ? parseInt(data.price, 10) : null,
            apartmentType: data.apartmentType,
            rooms: data.rooms,
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Päivitys epäonnistui');
    }

    return res.json();
}

export async function deleteListing(id: string) {
    const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Poistaminen epäonnistui');
    }
}