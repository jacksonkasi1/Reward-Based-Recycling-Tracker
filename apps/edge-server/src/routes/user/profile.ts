import { Hono } from "hono";

// Import 3rd-party
import { eq } from "drizzle-orm";

// Import db/schema
import { getDb } from "@repo/db";
import { tbl_users } from "@repo/db";

// Import middleware
import { authMiddleware } from "@/middleware/jwt-auth";

// Import types
import type { JWTPayload } from "@/types/auth";

const protectedRoute = new Hono();

protectedRoute.get("/", authMiddleware, async (c) => {
  const user = c.get("user") as JWTPayload;

  const db = getDb(c.env.DATABASE_URL);

  const users = await db
    .select({
      id: tbl_users.id,
      name: tbl_users.name,
      email: tbl_users.email,
      image: tbl_users.image,
      points: tbl_users.points,
      created_at: tbl_users.created_at,
      updated_at: tbl_users.updated_at,
    })
    .from(tbl_users)
    .where(eq(tbl_users.id, user.sub));

  if (users.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ message: "User profile", user: users[0] });
});

export default protectedRoute;
