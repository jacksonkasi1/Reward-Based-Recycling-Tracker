// src/types/common.ts

/**
 * Interface for the environment variables used in the application.
 */
export interface Env {
  NODE_ENV: string;
  BETTER_AUTH_URL: string;
  BETTER_AUTH_SECRET: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  [key: string]: string | undefined;
}
