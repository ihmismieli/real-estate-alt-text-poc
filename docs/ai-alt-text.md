# AI-Generated Alternative Text

## Purpose

The application automatically generates Finnish alternative text for newly uploaded listing images using the OpenAI Responses API. Admins can review and edit the descriptions before publishing a listing.

This document describes the current proof-of-concept implementation. Generating alternative text does not publish a listing or verify the factual accuracy of its content.

## Setup

Complete the database, authentication, and Vercel Blob setup described in the [README](../README.md). Install the project dependencies with `npm ci` and apply the existing database migrations as described in [Database migrations](db-migrations.md).

Add these server-side environment variables to `.env` for local development:

```dotenv
OPENAI_API_KEY=replace_with_your_api_key
OPENAI_MODEL=gpt-6-sol
```

- `OPENAI_API_KEY` is required for generation.
- `OPENAI_MODEL` is an optional server fallback when no model is explicitly selected.
- Configure the variables separately for the relevant Vercel Preview and Production environments, then redeploy. Restart the development server after changing local values.

The OpenAI project must have access to the selected model and sufficient API quota. The options below are the application's configured allowlist, not a guarantee of model access for every API account.

## Model selection

The upload form offers the models configured in [models.ts](../src/lib/alt-text/models.ts):

| Label | Configured model ID |
| ----- | ------------------- |
| Luna  | `gpt-6-luna`        |
| Sol   | `gpt-6-sol`         |
| Astra | `gpt-6-astra`       |

Sol is the current form default. The selected model applies to all eligible images uploaded in that save operation. Each image is uploaded in a separate request containing the same `altTextModel` selection.

The server validates the model against the allowlist and uses this order:

1. The model explicitly supplied with the upload or service call.
2. `OPENAI_MODEL` from the server environment.
3. `DEFAULT_ALT_TEXT_MODEL`, currently `gpt-6-sol`.

Changing `OPENAI_MODEL` does not override a model explicitly sent by the form. The selection is not stored as a permanent listing setting, and changing it does not regenerate existing descriptions. Generation history records the model used for each result.

## Upload and generation workflow

1. An authorized admin selects images, chooses a model, and saves the listing.
2. The upload route validates and optimizes each image, stores it in Vercel Blob, and creates its database record.
3. If the supplied alternative text contains non-whitespace characters, it is saved with source `MANUAL` and generation is skipped. Empty or whitespace-only text is treated as missing.
4. An image without text is saved with status `PROCESSING` and a start time. The route schedules generation with Next.js `after()`, allowing the upload response to finish before generation completes.
5. The server sends the stored image URL and the appropriate description instructions to OpenAI.
6. The service checks the response and attempts to record generation history. An accepted result is saved to `Image.altText` only if the image still exists, its text is still `null`, and its status is still `PROCESSING`.
7. A successful image update sets status `COMPLETED`, source `AI_GENERATED`, and clears the start time. The relevant public listing caches are invalidated.
8. The admin editor refreshes listing data while generation is running and displays the saved text for review.

The upload route handles one image per request; the form sends multiple images one by one. Each eligible upload schedules its own generation task.

New listings remain drafts until explicitly published by an admin. Generation does not change publication status. For a listing that is already public, saved image and alternative-text changes use the normal public cache invalidation path; there is no separate approval stage for those changes.

## Description instructions

[prompts.ts](../src/lib/alt-text/prompts.ts) selects one of two instruction sets:

| Image type        | Instructions                                                          | Image detail setting |
| ----------------- | --------------------------------------------------------------------- | -------------------- |
| `FLOOR_PLAN`      | [Floor plan prompt](../src/lib/alt-text/prompts/floor-plan-prompt.ts) | `high`               |
| `MAIN` or `OTHER` | [Room image prompt](../src/lib/alt-text/prompts/room-image-prompt.ts) | `auto`               |

The floor plan prompt describes the layout from the entrance along the main route through the property.
Prompts guide the model but do not guarantee accuracy or adherence to every formatting instruction. The service does not automatically verify room identification, spatial relationships, or accessibility quality. Admins should check these before publication.

## API request and validation

The image URL and instructions are sent to OpenAI for processing. Uploads currently use public Vercel Blob URLs, including for draft listings.

A result is accepted only when the response status is `completed`, no refusal content is present, trimmed output text is non-empty, and token usage is available. The service returns a controlled result rather than exposing an API exception to the browser.

| Error code            | Meaning                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `CONFIGURATION_ERROR` | The API key is missing or the resolved model is not allowed.                                               |
| `INVALID_IMAGE_URL`   | The image URL is invalid or does not use HTTPS.                                                            |
| `GENERATION_FAILED`   | The request failed, timed out, was refused, or did not provide the required completed text and usage data. |

## Generation states and manual edits

| Image status | Meaning                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------ |
| `IDLE`       | No active generation. Also used after a manual save and after stale processing is cleared. |
| `PROCESSING` | Generation has been scheduled or is running.                                               |
| `COMPLETED`  | Generated text was successfully saved to the image.                                        |
| `FAILED`     | Generation or saving failed and the failure status could be recorded.                      |

The text field stays editable during generation. Saving a manual edit sets status `IDLE`, clears the start time, and sets source `MANUAL` for non-empty text or `null` for empty text. This prevents the pending generation result from overwriting that save. Clearing text does not automatically start another generation.

[use-listing.ts](../src/app/admin/hooks/use-listing.ts) configures SWR to refresh every five seconds while any image is `PROCESSING`. These requests fetch data from the application's admin API. They do not call OpenAI again. Interval refresh stops when no processing images remain.

## Generation history

[save-alt-text-generation-history.ts](../src/lib/alt-text/save-alt-text-generation-history.ts) attempts to create an `AltTextGeneration` row for each returned service result:

- Success: `SUCCEEDED`, the returned model ID, generated text, input/output/total tokens, cached input tokens, and cache write tokens.
- Failure: `FAILED`, the selected model, and the service error code.

## Testing alt-text generation

### Through the admin interface

1. Create or edit a draft listing.
2. Select an image and model, leaving the image's alternative text empty.
3. Save the draft and open or remain in its editor.
4. Wait for the generation status to change and review the returned Finnish text.
5. Correct and save the text if needed, then publish the listing when its content is ready.

To check manual-text behavior, upload another image with text already entered. It should retain that text and skip generation.

### From the terminal

The existing [test script](../scripts/test-alt-text.ts) calls the generation service directly. Set its `imageUrl` to an accessible HTTPS image you intend to process and set `imageType` to match it. The script currently contains a fixed example URL.

From the project root, with credentials in `.env`, run:

```powershell
node --env-file=.env --conditions=react-server --import=tsx scripts/test-alt-text.ts
```

The script prints the model and generated text, or a controlled error. It does not upload an image, update image records, or create generation history. Use the admin workflow to test the complete upload-to-save process.
