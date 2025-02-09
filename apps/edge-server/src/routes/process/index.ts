// src/routes/auth/index.ts

import { Hono } from "hono";

// Import routes
import processRoute from "./process";


const userRoute = new Hono();

// Route endpoints under their respective paths.
userRoute.route("/verify", processRoute);

export default userRoute;
