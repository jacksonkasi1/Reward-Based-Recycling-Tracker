import { Hono } from "hono";

// Import 3rd-party
import { eq } from "drizzle-orm";

// Import db/schema
import { getDb } from "@repo/db";
import { tbl_users } from "@repo/db";

// Import utils
import { hashPassword } from "@/utils/auth";

// Import types
import { Env } from "@/types/common";

const signupRoute = new Hono<{ Bindings: Env }>();

signupRoute.post("/", async (c) => {
  const body = await c.req.json();
  const { email, password, name, visitor_id } = body;

  if (!email || !password || !name || !visitor_id) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  const db = getDb(c.env.DATABASE_URL);

  // **🔹 Step 1: Check if a user with the same email already exists**
  const existingEmail = await db
    .select()
    .from(tbl_users)
    .where(eq(tbl_users.email, email));

  if (existingEmail.length > 0) {
    return c.json({ error: "User already exists with this email" }, 400);
  }

  // **🔹 Step 2: Prevent multiple accounts from the same device**
  const existingDevice = await db
    .select()
    .from(tbl_users)
    .where(eq(tbl_users.visitor_id, visitor_id));

  if (existingDevice.length > 0) {
    return c.json({ error: "Signup from this device is not allowed. Multiple accounts detected." }, 403);
  }

  // **🔹 Step 3: Create new user**
  const password_hash = await hashPassword(password);
  const newUser = {
    visitor_id, // 🔹 Store the visitor_id
    name,
    email,
    password_hash,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await db.insert(tbl_users).values(newUser).returning();
  
  return c.json({ message: "User created successfully" }, 201);
});

export default signupRoute;
