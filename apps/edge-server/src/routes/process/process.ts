import { Hono } from "hono";

// Import middleware
import { authMiddleware } from "@/middleware/jwt-auth";

// Import types
import type { Env } from "@/types/common";
import type { JWTPayload } from "@/types/auth";

const protectedRoute = new Hono<{ Bindings: Env; Variables: { user: JWTPayload } }>();

protectedRoute.post("/", authMiddleware, async (c) => {
  const header = c.header;
  const body = c.body;


  return c.json({ message: "Submitted successfully, points will update soon" });
});

export default protectedRoute;
