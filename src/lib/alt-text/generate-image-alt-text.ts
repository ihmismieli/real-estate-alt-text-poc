import 'server-only';
import OpenAI from 'openai';
import type {
    AltTextErrorCode,
    GenerateAltTextInput,
    GenerateAltTextResult,
} from '@/app/types/alt-text-types';
import { getAltTextInstructions } from '@/lib/alt-text/prompts';
import {
    DEFAULT_ALT_TEXT_MODEL,
    isAltTextModel,
} from '@/lib/alt-text/models';

function altTextFailureResult(code: AltTextErrorCode, message: string): GenerateAltTextResult {
    return {
        success: false,
        error: {
            code,
            message,
        },
    };
}

export async function generateImageAltText({
    imageUrl,
    imageType,
    model: selectedModel,
}: GenerateAltTextInput): Promise<GenerateAltTextResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = selectedModel ?? process.env.OPENAI_MODEL ?? DEFAULT_ALT_TEXT_MODEL;

    if (!apiKey) {
        return altTextFailureResult(
            'CONFIGURATION_ERROR',
            'OpenAI API key is not set.'
        );
    }

    if (!isAltTextModel(model)) {
        return altTextFailureResult(
            'CONFIGURATION_ERROR',
            'AI model is not allowed.'
        )
    }

    try {
        const url = new URL(imageUrl);

        if (url.protocol !== 'https:') {
            return altTextFailureResult(
                'INVALID_IMAGE_URL',
                'The image URL must use HTTPS.'
            );
        }
    } catch {
        return altTextFailureResult(
            'INVALID_IMAGE_URL',
            'The image URL is invalid.'
        );
    }

    try {
        const client = new OpenAI({
            apiKey,
            timeout: 30_000,
            maxRetries: 0,


        });

        const response = await client.responses.create({
            model,
            store: false,
            max_output_tokens: 2000,
            instructions: getAltTextInstructions(imageType),
            input: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'input_text',
                            text: 'Laadi tälle kuvalle suomenkielinen tekstivastine annettujen ohjeiden mukaan.',
                        },
                        {
                            type: 'input_image',
                            image_url: imageUrl,
                            detail: imageType === 'FLOOR_PLAN' ? 'high' : 'auto',
                        },
                    ],
                },
            ],
        });

        if (response.usage) {
            console.log('Alt-text token usage:', {
                responseId: response.id,
                model: response.model,
                inputTokens: response.usage.input_tokens,
                outputTokens: response.usage.output_tokens,
                totalTokens: response.usage.total_tokens,
            });
        }


        const refused = response.output.some(
            (item) =>
                item.type === 'message' &&
                item.content.some(
                    (content) => content.type === 'refusal'
                )
        );

        const altText = response.output_text.trim();

        if (response.status !== 'completed' || refused || !altText) {
            return altTextFailureResult(
                'GENERATION_FAILED',
                'OpenAI did not return a completed response containing alt text.'
            );
        }

        const usage = response.usage;

        if (!usage) {
            return altTextFailureResult(
                'GENERATION_FAILED',
                'OpenAI did not return token usage information.'
            );
        }

        return {
            success: true,
            altText,
            model: response.model,
            usage: {
                inputTokens: usage.input_tokens,
                outputTokens: usage.output_tokens,
                totalTokens: usage.total_tokens,
                cachedInputTokens: usage.input_tokens_details.cached_tokens,
                cacheWriteTokens: usage.input_tokens_details.cache_write_tokens,
            },
        };
    } catch (error) {
        console.error('Alt-text generation failed', {
            errorType: error instanceof Error ? error.name : 'Unknown',
            status:
                error instanceof OpenAI.APIError ? error.status : undefined,
            requestId:
                error instanceof OpenAI.APIError ? error.requestID : undefined,
            type: error instanceof OpenAI.APIError ? error.type : undefined,
            message: error instanceof Error ? error.message : 'Unknown error',
        });

        return altTextFailureResult(
            'GENERATION_FAILED',
            'Alt-text generation failed.'
        );
    }
}