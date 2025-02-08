// src/routes/index.ts

import { Hono } from "hono";


import imageProcessRoute from "./validate-process";
import uploadRoute from "./upload";


export const routes = new Hono();


// Mount routes
routes.get("/", (c) => c.text("API (Async Task)..."));

routes.route("/user", imageProcessRoute);
routes.route("/upload", uploadRoute);
