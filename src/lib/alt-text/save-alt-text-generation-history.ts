import 'server-only';

import { prisma } from '@/lib/prisma';
import type {
    AiModel,
    GenerateAltTextResult,
} from '@/app/types/alt-text-types';

export async function saveAltTextGenerationHistory(
    imageId: string,
    selectedModel: AiModel,
    result: GenerateAltTextResult
): Promise<void> {

    try {
        if (result.success) {
            await prisma.altTextGeneration.create({
                data: {
                    imageId,
                    status: 'SUCCEEDED',
                    model: result.model,
                    generatedAltText: result.altText,
                    inputTokens: result.usage.inputTokens,
                    outputTokens: result.usage.outputTokens,
                    totalTokens: result.usage.totalTokens,
                    cachedInputTokens: result.usage.cachedInputTokens,
                    cacheWriteTokens: result.usage.cacheWriteTokens,
                },
            });
        } else {
            await prisma.altTextGeneration.create({
                data: {
                    imageId,
                    status: 'FAILED',
                    model: selectedModel,
                    errorCode: result.error.code,
                },
            });
        }
    } catch (error) {
        console.error('Failed to save alt-text generation history', {
            imageId,
            model: selectedModel,
            error,
        })
    }
}