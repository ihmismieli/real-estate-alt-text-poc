import type { ImageType } from '@/app/types/listing-types';

export type GenerateAltTextInput = {
    imageUrl: string;
    imageType: ImageType;
};
export type AltTextErrorCode =
    | 'CONFIGURATION_ERROR'
    | 'INVALID_IMAGE_URL'
    | 'GENERATION_FAILED';

export type GenerateAltTextResult =
    | {
        success: true;
        altText: string;
        model: string;
    }
    | {
        success: false;
        error: {
            code: AltTextErrorCode;
            message: string;
        };
    };