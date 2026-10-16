-- CreateEnum
CREATE TYPE "AltTextSource" AS ENUM ('MANUAL', 'AI_GENERATED');

-- CreateEnum
CREATE TYPE "ImageAltTextStatus" AS ENUM ('IDLE', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "altTextSource" "AltTextSource",
ADD COLUMN     "altTextStartedAt" TIMESTAMP(3),
ADD COLUMN     "altTextStatus" "ImageAltTextStatus" NOT NULL DEFAULT 'IDLE';
