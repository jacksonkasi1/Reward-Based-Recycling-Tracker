import { execSync } from 'child_process';

// Function to get an environment variable by executing a shell command
const getEnvVar = (variable: string): string => {
  try {
    return execSync(`echo $${variable}`, { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error(`Failed to fetch environment variable: $${variable}`, error);
    return '';
  }
};

// Export env variables dynamically
export const env = {
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  GCLOUD_STORAGE_BUCKET: getEnvVar('GCLOUD_STORAGE_BUCKET'),
  GCLOUD_PROJECT_ID: getEnvVar('GCLOUD_PROJECT_ID'),
  GCLOUD_SERVICE_ACCOUNT_KEY: getEnvVar('GCLOUD_SERVICE_ACCOUNT_KEY'),
  FRONTEND_URL: getEnvVar('FRONTEND_URL'),
  EDGE_SERVER_URL: getEnvVar('EDGE_SERVER_URL'),
};

console.log('Loaded Environment Variables:', env);