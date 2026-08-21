export async function createListing(data: {
    address?: string;
    postalCode?: string;
    district?: string;
    municipality?: string;
    price?: string;
    description?: string;
    apartmentType?: string;
    rooms?: string;
    livingArea?: string;
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
            livingArea: data.livingArea ? parseInt(data.livingArea, 10) : null,
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
    const uploadedImages = [];


    for (const image of images) {
        const formData = new FormData();
        formData.append('images', image);


        const res = await fetch(`/api/admin/listings/${listingId}/images`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            throw new Error(error?.error || 'Kuvien lataus epäonnistui');
        }

        const createdImages = await res.json();
        uploadedImages.push(...createdImages);
    }

    return uploadedImages;
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
        livingArea?: string;
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
            livingArea: data.livingArea ? parseInt(data.livingArea, 10) : null,
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

export async function deleteListingImage(listingId: string, imageId: string) {
    const res = await fetch(`/api/admin/listings/${listingId}/images/${imageId}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Kuvan poistaminen epäonnistui');
    }

    return res.json();
}

export async function updateListingImageAltText(
    listingId: string,
    imageId: string,
    altText: string | null
) {
    const res = await fetch(`/api/admin/listings/${listingId}/images/${imageId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            altText,
        }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Tekstivastineen päivittäminen epäonnistui');
    }

    return res.json();
}