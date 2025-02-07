// src/types/auth.ts

/**
 * Interface for the JWT payload, which will be attached to the request context.
 */
export interface JWTPayload {
  sub: string; // User ID
  email: string;
  exp: number; // Expiration timestamp
}
