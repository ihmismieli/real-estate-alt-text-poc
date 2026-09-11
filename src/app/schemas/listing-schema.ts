import { z } from 'zod/v4';

export type ListingFormType = z.input<typeof listingFormSchema>;

const listingText = (label: string, maxLength: number) => {
    return z
        .string()
        .max(maxLength, { message: `${label} voi olla enintään ${maxLength} merkkiä` })
        .optional()
}

export const listingFormSchema = z.object({
    address: listingText('Osoite', 100),
    postalCode: z
        .string()
        .trim()
        .refine(
            (value) => value === '' || /^\d{5}$/.test(value),
            { message: 'Postinumeron pitää sisältää 5 numeroa' }
        )
        .optional(),
    district: listingText('Kaupunginosa', 100),
    municipality: listingText('Kunta', 100),
    apartmentType: listingText('Asunnon tyyppi', 100),
    rooms: listingText('Huoneiden lukumäärä', 50),
    description: listingText('Kuvaus', 5000),
    price: z
        .string()
        .trim()
        .refine(
            (value) =>
                value === '' ||
                (/^\d+$/.test(value) && Number(value) <= 50_000_000),
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
                value === '' || /^\d+(?:[.,]\d{1,2})?$/.test(value), {
            error:
                'Asuinpinta-alan pitää olla kokonaisluku tai sisältää enintään kaksi desimaalia',

        }
        )
        .optional(),
});
