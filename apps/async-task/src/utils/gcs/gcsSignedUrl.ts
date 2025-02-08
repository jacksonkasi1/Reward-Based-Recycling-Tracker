// src/utils/gcsSignedUrl.ts

// Import config
import { env } from "@/config/env";

// Import 3rd-party library
import shortUUID from "short-uuid";

import { bucket } from "./gcs";

const uuid = shortUUID();

/**
 * Generates a signed URL for uploading an image to Google Cloud Storage with a unique filename.
 *
 * @param originalFileName - The original file name provided by the user.
 * @param expiresInSeconds - How many seconds until the URL expires.
 * @param contentType - The MIME type of the file to be uploaded.
 * @returns A Promise that resolves to an object containing the signed URL and public URL.
 */
export async function generateUploadSignedUrl(
  originalFileName: string,
  expiresInSeconds: number,
  contentType: string
): Promise<{ signedUrl: string; publicUrl: string; uniqueFileName: string }> {
  // Extract file extension (if any) from the original file name
  const fileExtension = originalFileName.split(".").pop();
  const uniqueFileName = `${uuid.generate()}.${fileExtension || "jpg"}`; // Generate unique filename

  const options = {
    version: "v4" as const,
    action: "write" as const,
    expires: Date.now() + expiresInSeconds * 1000, // expiration time in milliseconds
    contentType,
  };

  const file = bucket.file(uniqueFileName);

  // Generate a signed URL for uploading
  const [signedUrl] = await file.getSignedUrl(options);

  // Public URL (accessible via HTTPS)
  const publicUrl = `https://storage.googleapis.com/${env.GCLOUD_STORAGE_BUCKET}/${uniqueFileName}`;

  return { signedUrl, publicUrl, uniqueFileName };
}