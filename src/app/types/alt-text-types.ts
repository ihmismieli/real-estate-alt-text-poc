import type { ImageType } from '@/app/types/listing-types';

export type AiModel =
    | 'gpt-6-luna'
    | 'gpt-6-sol'
    | 'gpt-6-astra';

export type GenerateAltTextInput = {
    imageUrl: string;
    imageType: ImageType;
    model?: AiModel;
};
export type AltTextErrorCode =
    | 'CONFIGURATION_ERROR'
    | 'INVALID_IMAGE_URL'
    | 'GENERATION_FAILED';

export type AltTextUsage = {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    cachedInputTokens: number;
    cacheWriteTokens: number;
}

export type GenerateAltTextResult =
    | {
        success: true;
        altText: string;
        model: string;
        usage: AltTextUsage;
    }
    | {
        success: false;
        error: {
            code: AltTextErrorCode;
            message: string;
        };
    };

