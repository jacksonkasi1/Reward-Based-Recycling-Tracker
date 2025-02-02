// ===================== Imports =====================

// Third-party libraries
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// ===================== Database Initialization =====================

/**
 * PostgreSQL connection pool using Neon PostgreSQL.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this environment variable is set.
});

/**
 * Drizzle ORM instance for database interactions.
 */
export const db = drizzle(pool);
