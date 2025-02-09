import { execSync } from 'child_process';

// Function to fetch and parse environment variables
const loadEnvVariables = () => {
  try {
    const envOutput = execSync('printenv', { encoding: 'utf-8' }); // Use 'set' for Windows
    const envVars = envOutput.split('\n').reduce((acc, line) => {
      const [key, value] = line.split('=');
      if (key && value !== undefined) acc[key] = value.trim();
      return acc;
    }, {} as Record<string, string>);
    return envVars;
  } catch (error) {
    console.error('Failed to load environment variables:', error);
    return {};
  }
};

// Load environment variables from shell
const envVariables = loadEnvVariables();

// Export env variables
export const env = {
  JWT_SECRET: envVariables.JWT_SECRET || '',
  DATABASE_URL: envVariables.DATABASE_URL || '',
  GCLOUD_STORAGE_BUCKET: envVariables.GCLOUD_STORAGE_BUCKET || '',
  GCLOUD_PROJECT_ID: envVariables.GCLOUD_PROJECT_ID || '',
  GCLOUD_SERVICE_ACCOUNT_KEY: envVariables.GCLOUD_SERVICE_ACCOUNT_KEY || '',
  FRONTEND_URL: envVariables.FRONTEND_URL || '',
  EDGE_SERVER_URL: envVariables.EDGE_SERVER_URL || '',
};

console.log('Loaded Environment Variables:', env);