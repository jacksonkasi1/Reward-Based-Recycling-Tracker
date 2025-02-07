import { serve } from '@hono/node-server'
import { Hono } from 'hono'

// Import db/schema
import { } from "@repo/db";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 5000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
