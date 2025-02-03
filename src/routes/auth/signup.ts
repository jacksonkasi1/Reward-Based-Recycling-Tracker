// src/routes/auth/signup.ts

import { Hono } from "hono";

// Import 3rd-party
import { eq } from "drizzle-orm";

// Import db/schema
import { getDb } from "@/db";
import { tbl_users } from "@/db/schema/tbl_users";

// Import utils
import { hashPassword } from "@/utils/auth";

// Import types
import { Env } from "@/types/common";


const signupRoute = new Hono<{ Bindings: Env }>();

signupRoute.post("/", async (c) => {
  const body = await c.req.json();
  const { email, password, name } = body;
  if (!email || !password || !name) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const db = getDb(c.env.DATABASE_URL);
  // Check if a user with the same email already exists.
  const existing = await db.select().from(tbl_users).where(eq(tbl_users.email, email));
  if (existing.length > 0) {
    return c.json({ error: "User already exists" }, 400);
  }

  const password_hash = await hashPassword(password);
  const newUser = {
    visitor_id: crypto.randomUUID(), // using built-in crypto
    name,
    email,
    password_hash,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const inserted = await db.insert(tbl_users).values(newUser).returning();
  return c.json({ message: "User created", user: inserted[0] }, 201);
});

export default signupRoute;
