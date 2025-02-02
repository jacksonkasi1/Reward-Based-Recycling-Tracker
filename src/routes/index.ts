import { Hono } from "hono";
import { getDb } from "@/db"; // Adjust the path as needed

// Import types
import { Env } from "@/types/common";

const route = new Hono<{ Bindings: Env }>();

route.get("/", (c) => {
  // c.env now includes DATABASE_URL, so this works as expected.
  const db = getDb(c.env!.DATABASE_URL);
  // You can now use `db` for your queries.
  return c.text("Database initialized.");
});

export default route;