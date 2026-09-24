import {
    BlobNotFoundError,
    del,
} from '@vercel/blob';

export async function deleteBlobIfExists(storageKey: string) {
    try {
        await del(storageKey);
    } catch (error) {
        if (error instanceof BlobNotFoundError) {
            console.warn(`Blob with storage key ${storageKey} not found, skipping deletion.`);
            return;
        } else {
            throw error;
        }
    }
}