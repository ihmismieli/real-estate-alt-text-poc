export async function createListing(data: {
    title: string;
    description: string;
    price: string;
    address: string;
}) {
    const res = await fetch('/api/admin/listings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            price: data.price ? parseInt(data.price, 10) : null,
            address: data.address,
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Kohteen luonti epäonnistui');
    }

    return res.json();
}

export async function updateListing(
    id: string,
    data: {
        title: string;
        description: string;
        price: string;
        address: string;
    }
) {
    const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            price: data.price ? parseInt(data.price, 10) : null,
            address: data.address,
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