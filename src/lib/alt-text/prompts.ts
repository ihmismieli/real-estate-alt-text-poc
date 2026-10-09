import 'server-only';
import type { ImageType } from '@/app/types/listing-types';
import { FLOOR_PLAN_PROMPT } from '@/lib/alt-text/floor-plan-prompt';
import { ROOM_IMAGE_PROMPT } from '@/lib/alt-text/room-image-prompt';

export function getAltTextInstructions(imageType: ImageType): string {
    return imageType === 'FLOOR_PLAN'
        ? FLOOR_PLAN_PROMPT
        : ROOM_IMAGE_PROMPT;
}