import { serve } from '@hono/node-server'
import { Hono } from 'hono'

// Import routes
import { routes } from "@/routes";

const app = new Hono()

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
