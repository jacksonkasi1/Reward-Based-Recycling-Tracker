import { Hono } from "hono";

// Import 3rd-party
import { eq } from "drizzle-orm";

// Import db/schema
import { getDb } from "@/db";
import { tbl_users } from "@/db/schema/tbl_users";

// Import middleware
import { authMiddleware } from "@/middleware/jwt-auth";

// Import types
import type { JWTPayload } from "@/types/auth";

const protectedRoute = new Hono();

protectedRoute.get("/profile", authMiddleware, async (c) => {
  const user = c.get("user") as JWTPayload;

  const db = getDb(c.env.DATABASE_URL);

  const users = await db
    .select()
    .from(tbl_users)
    .where(eq(tbl_users.id, user.sub));

  if (users.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ message: "User profile", user: users[0] });
});

export default protectedRoute;
