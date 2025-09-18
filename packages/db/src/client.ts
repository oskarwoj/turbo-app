import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not set. Please provide a valid Postgres connection string.\n' +
      'Example: postgresql://user:password@localhost:5432/turbo_app\n' +
      'Tip: create a .env file at the repository root with DATABASE_URL=...',
  );
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
