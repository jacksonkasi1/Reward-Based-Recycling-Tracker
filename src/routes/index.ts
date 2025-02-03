// src/routes/index.ts

import { Hono } from "hono";

// Import routes
import authApi from "@/routes/auth";

export const routes = new Hono();

// Mount routes
routes.route("/auth-v2", authApi);
