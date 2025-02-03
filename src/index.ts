import { Hono } from "hono";
import { cors } from "hono/cors";

// Import routes
import { routes } from "@/routes";
import authApi from "@/routes/auth";

// Import auth functions
import { configureAuth } from "@/lib/auth";

// Import middleware
import { authMiddleware } from "@/middleware/jwt-auth";

// Import types
import { Env } from "@/types/common";

const app = new Hono();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8787",
      "*", // Allow all origins (not recommended for production)
    ],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/**", async (c) => {
  const auth = configureAuth(c.env as Env);
  const response = await auth.handler(c.req.raw);
  // Example: You can handle response customization here if needed
  return response;
});

// Add session middleware
routes.route("/api/auth-v1", authApi);
app.use("/api/v1/*", authMiddleware);
app.route("/api/v1", routes);

app.get("/", (c) => c.text("Server is running."));

export default app;
