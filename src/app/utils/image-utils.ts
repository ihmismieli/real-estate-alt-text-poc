import type {
    ImageType,
    ListingImage,
} from '@/app/types/listing';
import { CarouselImage } from '../components/carousel/carousel';

export const IMAGE_TYPE_ORDER: Record<ImageType, number> = {
    MAIN: 0,
    FLOOR_PLAN: 1,
    OTHER: 2,
};

export function sortListingImages(
    images: ListingImage[] | CarouselImage[]
) {
    return [...images].sort((a, b) => {
        const typeDifference =
            IMAGE_TYPE_ORDER[a.imageType] -
            IMAGE_TYPE_ORDER[b.imageType];

        if (typeDifference !== 0) {
            return typeDifference;
        }

        return a.sortOrder - b.sortOrder;
    });
}
