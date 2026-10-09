BEGIN;

CREATE TYPE "ListingStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- Existing listings receive the PUBLISHED status.
ALTER TABLE "Listing"
ADD COLUMN "status" "ListingStatus" NOT NULL DEFAULT 'PUBLISHED';

-- Future listings are drafts by default.
ALTER TABLE "Listing"
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

COMMIT;