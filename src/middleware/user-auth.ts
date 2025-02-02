import { createMiddleware } from "hono/factory";

// Import lib
import { configureAuth } from "@/lib/auth";

export const sessionMiddleware = createMiddleware(async (c, next) => {
  try {
    const auth = configureAuth(c.env);

    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return c.json(
        {
          success: false,
          message: "Unauthorized: Session not available",
        },
        401,
      );
    }

    c.set("user", session.user);
    c.set("session", session.session);
    await next();
  } catch (error) {
    console.error("Error fetching session:", error);
    return c.json(
      { message: "An error occurred while processing the session." },
      500,
    );
  }
});
