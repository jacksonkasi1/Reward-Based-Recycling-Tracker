// src/routes/index.ts

import { Hono } from "hono";


import uploadRoute from "./upload";
import imageProcessRoute from "./validate-process";



export const routes = new Hono();


// Mount routes
routes.get("/", (c) => c.text("API (Async Task)..."));

routes.route("/process", imageProcessRoute);
routes.route("/upload", uploadRoute);
