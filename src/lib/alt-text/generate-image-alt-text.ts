import 'server-only';
import OpenAI from 'openai';
import type {
    AltTextErrorCode,
    GenerateAltTextInput,
    GenerateAltTextResult,
} from '@/app/types/alt-text-types';
import { getAltTextInstructions } from '@/lib/alt-text/prompts';

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
    imageUrl, imageType,
}: GenerateAltTextInput): Promise<GenerateAltTextResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL;

    if (!apiKey || !model) {
        return altTextFailureResult(
            'CONFIGURATION_ERROR',
            'OpenAI API avainta tai mallia ei ole määritetty.'
        );
    }

    try {
        const url = new URL(imageUrl);

        if (url.protocol !== 'https:') {
            return altTextFailureResult(
                'INVALID_IMAGE_URL',
                'Kuvan URL-osoite täytyy käyttää HTTPS-protokollaa'
            );
        }
    } catch {
        return altTextFailureResult(
            'INVALID_IMAGE_URL',
            'Kuvan URL-osoite ei ole kelvollinen'
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
                'OpenAI:n vastaus ei sisältänyt tekstivastinetta'
            );
        }

        return {
            success: true,
            altText,
            model,
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
            'Tekstivastineen luonti epäonnistui. Yritä uudelleen.'
        );
    }
}