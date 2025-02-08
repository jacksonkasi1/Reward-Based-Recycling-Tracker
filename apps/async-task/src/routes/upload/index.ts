// src/routes/auth/index.ts

import { Hono } from "hono";

// Import routes
import signedUrlRoute from "./signed_url";


const route = new Hono();

// Route endpoints under their respective paths.
route.route("/signed-url", signedUrlRoute);

export default route;
