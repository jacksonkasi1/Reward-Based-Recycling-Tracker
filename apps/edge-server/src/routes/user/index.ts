// src/routes/auth/index.ts

import { Hono } from "hono";

// Import routes
import profileRoute from "./profile";


const userRoute = new Hono();

// Route endpoints under their respective paths.
userRoute.route("/profile", profileRoute);

export default userRoute;
