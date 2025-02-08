export const env = {
  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL: process.env.DATABASE_URL!,

  // Google Cloud Storage Configuration
  GCLOUD_STORAGE_BUCKET: process.env.GCLOUD_STORAGE_BUCKET!,  // Name of your GCS bucket
  GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID!,         // Google Cloud Project ID
  GCLOUD_SERVICE_ACCOUNT_KEY: process.env.GCLOUD_SERVICE_ACCOUNT_KEY!, // Base64-encoded service account key (optional)
};
