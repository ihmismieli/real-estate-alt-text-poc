/*
  Warnings:

  - You are about to drop the column `title` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "title",
ADD COLUMN     "apartmentType" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "municipality" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "rooms" TEXT;
