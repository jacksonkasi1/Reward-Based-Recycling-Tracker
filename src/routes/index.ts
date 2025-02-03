// src/routes/index.ts

import { Hono } from "hono";
import userRoute from "./user";


export const routes = new Hono();

// Mount routes
routes.route("/user", userRoute);
