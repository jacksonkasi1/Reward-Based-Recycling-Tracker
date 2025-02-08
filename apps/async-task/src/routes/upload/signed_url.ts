// src/routes/uploadImage.ts

import { Hono } from "hono";

// Import utility
import { generateUploadSignedUrl } from "@/utils/gcs";

const route = new Hono();

route.get("/upload-image", async (c) => {
  // Expect the client to pass a 'filename' query parameter.
  const fileName = c.req.query("filename");
  // Optionally, the client may specify a content type; default to 'image/jpeg'
  const contentType = c.req.query("contentType") || "image/jpeg";

  if (!fileName) {
    return c.json({ error: "Missing 'filename' query parameter" }, 400);
  }

  try {
    // Generate a signed URL valid for 1 hour (3600 seconds)
    const signedUrlData = await generateUploadSignedUrl(
      fileName,
      3600,
      contentType,
    );

    return c.json({
      message: "Signed URL generated successfully",
      data: {
        signedUrl: signedUrlData.signedUrl,
        publicUrl: signedUrlData.publicUrl,
      },
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return c.json({ error: "Failed to generate signed URL" }, 500);
  }
});

export default route;
