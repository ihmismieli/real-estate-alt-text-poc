-- CreateEnum
CREATE TYPE "AltTextGenerationStatus" AS ENUM ('SUCCEEDED', 'FAILED');

-- CreateTable
CREATE TABLE "AltTextGeneration" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "status" "AltTextGenerationStatus" NOT NULL,
    "model" TEXT,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "totalTokens" INTEGER,
    "cachedInputTokens" INTEGER,
    "cacheWriteTokens" INTEGER,
    "generatedAltText" TEXT,
    "errorCode" TEXT,
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AltTextGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AltTextGeneration_imageId_createdAt_idx" ON "AltTextGeneration"("imageId", "createdAt");

-- AddForeignKey
ALTER TABLE "AltTextGeneration" ADD CONSTRAINT "AltTextGeneration_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
