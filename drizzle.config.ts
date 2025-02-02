import "dotenv/config";
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle", // Output directory for generated code
  driver: "pg", // PostgreSQL driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
});
