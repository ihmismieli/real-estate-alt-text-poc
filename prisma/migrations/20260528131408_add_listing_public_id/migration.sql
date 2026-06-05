/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "publicId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Listing_publicId_key" ON "Listing"("publicId");
