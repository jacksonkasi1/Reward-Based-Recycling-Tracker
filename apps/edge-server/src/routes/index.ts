// src/routes/index.ts

import { Hono } from "hono";

// Import routes
import userRoute from "./user";
import processRoute from "./process";


export const routes = new Hono();


// Mount routes
routes.get("/", (c) => c.text("API v1"));

routes.route("/user", userRoute);
routes.route("/process", processRoute);
