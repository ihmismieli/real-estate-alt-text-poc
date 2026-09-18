-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('MAIN', 'FLOOR_PLAN', 'OTHER');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "imageType" "ImageType" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Image_listingId_imageType_sortOrder_idx" ON "Image"("listingId", "imageType", "sortOrder");
