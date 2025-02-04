// src/middleware/jwt-auth.ts

import type { Context, Next } from "hono";

// Import utils
import { verifyJWT } from "@/utils/auth";

// Import types
import type { Env } from "@/types/common";
import type { JWTPayload } from "@/types/auth";

type ContextWithUser = Context<{ Bindings: Env; Variables: { user: JWTPayload } }>;

/**
 * Middleware to authenticate requests using a JWT from the Authorization header.
 */
export async function authMiddleware(c: ContextWithUser, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json({ error: "Authorization header missing" }, 401);
  }

  // Expecting the format "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return c.json({ error: "Invalid Authorization header format" }, 401);
  }

  const token = parts[1];
  const secret = c.env.JWT_SECRET;

  const verified = await verifyJWT(token, secret);
  if (!verified || !verified.payload) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  // Attach user payload to context for downstream handlers.
  // You can use a custom property on the context if needed.
  c.set("user", verified.payload);

  return next();
}
