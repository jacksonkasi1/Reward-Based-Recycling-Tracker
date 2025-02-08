// src/utils/gcsSignedUrl.ts

import { bucket } from "./gcs";

/**
 * Generates a signed URL for uploading an image to Google Cloud Storage.
 *
 * @param fileName - The name (or path) for the file to be uploaded.
 * @param expiresInSeconds - How many seconds until the URL expires.
 * @param contentType - The MIME type of the file to be uploaded.
 * @returns A Promise that resolves to the signed URL.
 */
export async function generateUploadSignedUrl(
  fileName: string,
  expiresInSeconds: number,
  contentType: string,
): Promise<string> {
  const options = {
    version: "v4" as const,
    action: "write" as const,
    expires: Date.now() + expiresInSeconds * 1000, // expiration time in milliseconds
    contentType,
  };

  const file = bucket.file(fileName);

  // Generate a signed URL for uploading
  const [url] = await file.getSignedUrl(options);
  return url;
}
