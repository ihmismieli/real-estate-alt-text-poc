import type { AiModel } from "@/app/types/alt-text-types";

export const DEFAULT_ALT_TEXT_MODEL: AiModel = 'gpt-6-sol'

export const ALT_TEXT_MODEL_OPTIONS: {
    value: AiModel;
    label: string;
}[] = [
        { value: 'gpt-6-luna', label: 'Luna' },
        { value: 'gpt-6-sol', label: 'Sol' },
        { value: 'gpt-6-astra', label: 'Astra' },
    ];

export function isAltTextModel(value: unknown): value is AiModel {
    return (
        typeof value === 'string' &&
        ALT_TEXT_MODEL_OPTIONS.some((option) => option.value === value)
    );
}