# Database migrations

This project uses Prisma migrations to keep the local, Preview, and production databases in sync.

## Local development database

Use the local database when developing a feature or changing the Prisma schema.

1. Switch to your feature branch:

   ```text
   git checkout feature/db-migration
   ```

2. Make the schema change in `prisma/schema.prisma`.

3. Create and apply a migration to the local database:

   ```powershell
   npx prisma migrate dev --name describe_the_change
   ```

   This creates a new folder under `prisma/migrations`, applies it to the local database, and updates the generated Prisma client.

4. Generate the Prisma Client:

   ```powershell
   npx prisma generate
   ```

   This updates the generated Prisma Client and its TypeScript types under `src/generated/prisma`.

5. Test the application locally.

## Check local migration status

To see whether the local database and migration files are in sync:

```powershell
npx prisma migrate status
```

## Resetting the local database

Only reset a disposable local database. This deletes its data and reapplies all migrations:

```powershell
npx prisma migrate reset
```

Never run `migrate reset` against the Preview or production database.

## Vercel Preview database

After a migration has been reviewed and merged into `develop`, apply the already-created migrations to the Vercel Preview database:

```powershell
git checkout develop
git pull
npx vercel env run -e preview -- npx prisma migrate deploy
```

This uses the `DATABASE_URL` from the Vercel Preview environment. It does not use the local `localhost` database. Ensure the local `.env` files do not override the Preview value when running this command.

`migrate deploy` applies pending migration files. It does not create a new migration and does not reset the database.

## Production database

Production migrations should be run by the production CI/CD deployment using:

```powershell
npx prisma migrate deploy
```

The production command must use the production environment's `DATABASE_URL`. Do not use the local or Preview database URL for production.
