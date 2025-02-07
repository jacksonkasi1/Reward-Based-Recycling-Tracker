// src/routes/auth/index.ts

import { Hono } from "hono";

// Import routes
import processRoute from "./process";


const route = new Hono();

// Route endpoints under their respective paths.
route.route("/profile", processRoute);

export default route;
