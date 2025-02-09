import { Hono } from "hono";

// Import 3rd-party
import { zValidator } from "@hono/zod-validator";

// Import middleware
import { authMiddleware } from "@/middleware/jwt-auth";

// Import types
import type { Env } from "@/types/common";
import type { JWTPayload } from "@/types/auth";

// Import validation schema
import { validationSchema } from "@/validation/process";

// Import utils
import { callBackgroundTask } from "@/utils/bg-task";

const protectedRoute = new Hono<{ Bindings: Env; Variables: { user: JWTPayload } }>();

protectedRoute.post("/", authMiddleware, zValidator("json", validationSchema), async (c) => {
  const headers = c.req.raw.headers;
  const body = await c.req.json();
  const bgTaskServerUrl = c.env.BG_TASK_SERVER_URL;

  if (!bgTaskServerUrl) {
    return c.json({ error: "Missing background task server URL" }, 500);
  }

  // Call Background Task API
  const result = await callBackgroundTask(bgTaskServerUrl, headers, body);

  return c.json({ message: result.message });
});

export default protectedRoute;