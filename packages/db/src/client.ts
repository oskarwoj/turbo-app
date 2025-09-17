import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import { z } from 'zod';

const { Pool } = pkg;

let cachedDb: NodePgDatabase | null = null;

export const getDb = (): NodePgDatabase => {
  if (cachedDb) return cachedDb;

  const Env = z.object({ DATABASE_URL: z.string().url() });
  const { DATABASE_URL } = Env.parse(process.env);

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  cachedDb = drizzle(pool);
  return cachedDb;
};
