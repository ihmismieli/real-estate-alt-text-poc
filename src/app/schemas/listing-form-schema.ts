import { z } from 'zod/v4';

const listingFormText = (label: string, maxLength: number) => {
    z
        .string()
        .max(maxLength, { message: `${label} voi olla enintään ${maxLength} merkkiä` })
        .optional()
}

export const listingFormSchema = z.object({
    address: listingFormText('Osoite', 200),
    postalCode: z
        .string()
        .trim()
        .refine(
            (value) => value === '' || /^\d{5}$/.test(value),
            { message: 'Postinumeron pitää sisältää 5 numeroa' }
        )
        .optional(),
    district: listingFormText('Kaupunginosa', 100),
    municipality: listingFormText('Kunta', 100),
    apartmentType: listingFormText('Asunnon tyyppi', 100),
    rooms: listingFormText('Huoneiden lukumäärä', 50),
    description: listingFormText('Kuvaus', 5000),
    price: z
        .string()
        .trim()
        .refine(
            (value) =>
                value === '' ||
                !/^\d+$/.test(value) ||
                Number(value) <= 50_000_000,
            {
                error: 'Hinta saa olla enintään 50 miljoonaa euroa',
            }
        )
        .optional(),
    livingArea: z
        .string()
        .trim()
        .refine(
            (value) =>
                value === '' ||
                /^\d+(?:[.,]\d+)?$/.test(value),
            {
                error:
                    'Asuinpinta-alan pitää olla kokonaisluku tai sisältää enintään kaksi desimaalia',

            }
        )
        .optional(),
});