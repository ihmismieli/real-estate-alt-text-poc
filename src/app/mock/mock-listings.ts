import { Listing } from '@/app/types/listing';

export const listings: Listing[] = [
    {
        id: "1",
        publicId: 1001,
        address: "Kaksio keskustassa",
        municipality: "Helsinki",
        price: 249000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        publicId: 1002,
        address: "Kolmio meren lähellä",
        municipality: "Espoo",
        price: 329000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
