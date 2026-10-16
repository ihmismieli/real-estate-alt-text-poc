import 'server-only';
import { prisma } from '@/lib/prisma';
import { invalidateListingSafely } from '@/lib/listing-cache';
import { generateImageAltText } from './generate-image-alt-text';
import type { ListingImage } from '@/app/types/listing-types';
import { AiModel } from '@/app/types/alt-text-types';
import { saveAltTextGenerationHistory } from './save-alt-text-generation-history';

type ImageGenerationType = Pick<ListingImage, 'id' | 'url' | 'imageType'>;

export async function generateAndSaveImageAltText(
    image: ImageGenerationType,
    listingPublicId: number,
    model: AiModel
): Promise<void> {

    const processingAltText = {
        id: image.id,
        altText: null,
        altTextStatus: 'PROCESSING' as const,
    };

    async function failedGeneration(): Promise<void> {

        try {
            await prisma.image.updateMany({
                where: processingAltText,
                data: {
                    altTextStatus: 'FAILED',
                    altTextStartedAt: null,
                },
            });
        } catch (error) {
            console.error('Error generating alt text:', {
                imageId: image.id,
                error,
            });
        }
    }

    try {
        const result = await generateImageAltText({
            imageUrl: image.url,
            imageType: image.imageType,
            model,
        });

        await saveAltTextGenerationHistory(
            image.id,
            model,
            result
        );

        if (!result.success) {
            console.error('Image alt-text generation failed', {
                imageId: image.id,
                model,
                error: result.error,
            });

            await failedGeneration();
            return;
        }

        const savedGeneratedAltText = await prisma.image.updateMany({
            where: processingAltText,
            data: {
                altText: result.altText,
                altTextStatus: 'COMPLETED',
                altTextSource: 'AI_GENERATED',
                altTextStartedAt: null,
            },
        });

        if (savedGeneratedAltText.count > 0) {
            invalidateListingSafely(listingPublicId);
        }
    } catch (error) {
        console.error('Error generating alt text:', {
            imageId: image.id,
            error,
        });
        await failedGeneration();
    }
}