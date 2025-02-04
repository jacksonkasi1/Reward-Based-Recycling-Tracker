import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

/**
 * Returns an instantiated drizzle database using the provided DATABASE_URL.
 * 
 * @param databaseUrl - The Neon database URL (typically from c.env.DATABASE_URL)
 * @returns The drizzle database instance.
 */
export function getDb(databaseUrl: string) {
  const client = neon(databaseUrl);
  return drizzle(client, { schema });
}
