import { Hono } from "hono";

// Import config
import { env } from "@/config/env";

// Import 3rd-party
import { eq } from "@repo/db";

// Import db/schema
import { getDb } from "@repo/db";
import { tbl_users } from "@repo/db";

// Import middleware
import { authMiddleware } from "@/middleware/jwt-auth";

// Import types
import type { JWTPayload } from "@repo/jwt";

const route = new Hono<{ Variables: { user: JWTPayload } }>();

route.get("/", authMiddleware, async (c) => {
  const user = c.get("user") as JWTPayload;

  const db = getDb(env.DATABASE_URL);
  const users = await db
    .select({
      id: tbl_users.id,
    })
    .from(tbl_users)
    .where(eq(tbl_users.id, user.sub));

  if (users.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ message: "User profile", user: users[0] });
});

export default route;
