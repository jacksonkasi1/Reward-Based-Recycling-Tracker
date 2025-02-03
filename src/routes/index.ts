import { Hono } from "hono";

// ** import routes
import authApi  from "@/routes/auth";

export const routes = new Hono();

routes.route("/auth-v2", authApi);