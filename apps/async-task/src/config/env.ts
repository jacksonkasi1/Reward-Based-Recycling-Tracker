import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL: process.env.DATABASE_URL!,

  // Google Cloud Storage Configuration
  GCLOUD_STORAGE_BUCKET: process.env.GCLOUD_STORAGE_BUCKET!,  // Name of your GCS bucket
  GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID!,         // Google Cloud Project ID
  GCLOUD_SERVICE_ACCOUNT_KEY: process.env.GCLOUD_SERVICE_ACCOUNT_KEY!, // Base64-encoded service account key (optional)

  FRONTEND_URL: process.env.FRONTEND_URL!,
  EDGE_SERVER_URL: process.env.EDGE_SERVER_URL!,

  IMAGE_PROCESS_SERVER_URL: process.env.IMAGE_PROCESS_SERVER_URL!,
};
