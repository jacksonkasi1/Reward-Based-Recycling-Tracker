import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors} from 'hono/cors'

import { logger } from 'hono/logger'

// Import config
import { env } from "@/config/env";

// Import routes
import { routes } from "@/routes";

const app = new Hono()

app.use(logger())

app.use(cors({
  origin: [
    env.FRONTEND_URL,
    env.EDGE_SERVER_URL,
    "*", // Allow all origins (not recommended for production)
  ],
  maxAge: 600,
  credentials: true,
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api", routes);

const port = 5000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
