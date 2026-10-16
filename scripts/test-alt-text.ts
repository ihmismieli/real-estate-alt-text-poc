import { generateImageAltText } from '../src/lib/alt-text/generate-image-alt-text';

async function main() {
    const result = await generateImageAltText({
        imageUrl: 'https://wwlwj7f2cipxpkoe.public.blob.vercel-storage.com/listings/cmu6why9v0000xoeuz59t0w8r/c59fe64c-13ea-468c-9322-597cb5265bc4.webp',
        imageType: 'OTHER',
    });

    if (!result.success) {
        console.error('Generointi epäonnistui:', result.error);
        process.exitCode = 1;
        return;
    }

    console.log('Käytetty malli:', result.model);
    console.log('Tekstivastine:');
    console.log(result.altText);
}

main().catch(() => {
    console.error('Testiskriptin suorittaminen epäonnistui.');
    process.exitCode = 1;
});