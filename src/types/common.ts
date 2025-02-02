export interface Env {
  NODE_ENV: string;
  BETTER_AUTH_URL: string;
  BETTER_AUTH_SECRET: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  DATABASE_URL: string;
  [key: string]: string | undefined;
}
