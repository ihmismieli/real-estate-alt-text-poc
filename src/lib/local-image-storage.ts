import { randomUUID } from 'node:crypto';
import { mkdir, rm, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const LISTING_UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads', 'listings');

function getFileExtension(file: File) {
    const extension = path.extname(file.name).toLowerCase();
    return extension || '.jpg';
}

function assertImageFile(file: File) {
    if (!file.type.startsWith('image/')) {
        throw new Error('Vain kuvatiedostot sallitaan');
    }

    if (file.size === 0) {
        throw new Error('Tyhjaa tiedostoa ei voi ladata');
    }
}

export async function saveListingImageLocally(listingPublicId: string, file: File) {
    assertImageFile(file);

    const fileName = `${randomUUID()}${getFileExtension(file)}`;
    const absoluteDir = path.join(LISTING_UPLOADS_DIR, listingPublicId);
    const absolutePath = path.join(absoluteDir, fileName);
    const url = path.posix.join('/uploads', 'listings', listingPublicId, fileName);

    await mkdir(absoluteDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(absolutePath, buffer);

    return { url, absolutePath };
}

export async function deleteLocalImageByUrl(url: string) {
    if (!url.startsWith('/uploads/listings/')) {
        return;
    }

    const absolutePath = path.join(PUBLIC_DIR, ...url.replace(/^\//, '').split('/'));
    await unlink(absolutePath).catch(() => undefined);
}

export async function deleteListingUploadDirectory(listingPublicId: string) {
    const absoluteDir = path.join(LISTING_UPLOADS_DIR, listingPublicId);
    await rm(absoluteDir, { recursive: true, force: true });
}