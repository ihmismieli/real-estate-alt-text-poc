# Accessible Alternative Text for Real Estate Listings – PoC

A proof-of-concept application for managing real estate listings and accessible alternative text for listing images. The application displays properties for sale and provides an admin interface for managing listing and image data.

## Features

- Browse properties for sale
- Sign in to the admin area with Google
- Create, edit, and delete listings
- Upload and delete listing images
- Store listing data in PostgreSQL with Prisma
- Store images in Vercel Blob

## Technologies

Next.js, React, TypeScript, Prisma, PostgreSQL, Auth.js, Vercel Blob, Sharp, and Mantine.

## Local development

### Requirements

- Node.js 24 or later
- npm
- A running local PostgreSQL database
- Google OAuth credentials for local sign-in
- Vercel Blob credentials if you want to upload images locally

### Setup

1. Install the dependencies:

   ```powershell
   npm ci
   ```

2. Create `.env.local` from `.env.example` and fill in the local values. The local `DATABASE_URL` should point to your local PostgreSQL database, for example `localhost:5433`.

   Required environment variables include:

   ```text
   DATABASE_URL
   DB_USER
   DB_PASSWORD
   DB_NAME
   AUTH_SECRET
   AUTH_GOOGLE_ID
   AUTH_GOOGLE_SECRET
   AUTH_URL
   ADMIN_EMAIL
   BLOB_STORE_ID
   BLOB_READ_WRITE_TOKEN
   ```

3. Apply the Prisma migrations to the local database:

   ```powershell
   npx prisma migrate dev
   ```

4. Start the development server:

   ```powershell
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Admin access

The admin area is restricted to the following Google account:

```text
alttextpoc@gmail.com
```

A user can authenticate with Google, but only this configured email address is allowed to use the admin area and its listing-management actions.

## Useful commands

```powershell
npm run lint       # Run ESLint
npm run check      # Run the TypeScript check
npm run build      # Create a production build
npm run fullcheck  # Run lint, TypeScript, and build checks
```

See [Database migrations](docs/db-migrations.md) for instructions on changing the database schema and applying migrations.

## Environments

- Local development uses the local `.env.local` values and a local database.
- The `develop` branch is tested with a protected Vercel Preview deployment and development database.
- Production uses the `main` branch with separate production database, Blob Store, and environment variables.
