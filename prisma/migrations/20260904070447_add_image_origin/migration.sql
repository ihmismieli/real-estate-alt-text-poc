-- CreateEnum
CREATE TYPE "ImageOrigin" AS ENUM ('REAL_IMAGE', 'AI_BASIC', 'AI_GENERATED', 'AI_EDITED', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "origin" "ImageOrigin" NOT NULL DEFAULT 'UNKNOWN';
