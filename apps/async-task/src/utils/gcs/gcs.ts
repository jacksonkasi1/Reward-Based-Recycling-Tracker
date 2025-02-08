// Import 3rd-party
import { Storage } from "@google-cloud/storage";

// Import config
import { env } from "@/config/env";

const storage = new Storage({
  projectId: env.GCLOUD_PROJECT_ID,
  credentials: env.GCLOUD_SERVICE_ACCOUNT_KEY
    ? JSON.parse(Buffer.from(env.GCLOUD_SERVICE_ACCOUNT_KEY, "base64").toString("utf-8"))
    : undefined, // Use default credentials if running on GCP
});

export const bucket = storage.bucket(env.GCLOUD_STORAGE_BUCKET);
