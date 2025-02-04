// src/routes/auth/index.ts

import { Hono } from "hono";

// Import routes
import signupRoute from "./signup";
import loginRoute from "./login";

const authRoute = new Hono();

authRoute.get("/", (c) => c.text("Auth routes"));

// Route endpoints under their respective paths.
authRoute.route("/signup", signupRoute);
authRoute.route("/login", loginRoute);

export default authRoute;
