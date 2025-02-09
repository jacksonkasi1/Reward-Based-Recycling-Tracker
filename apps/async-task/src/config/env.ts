import { execSync } from "child_process";

// Retrieve OP_SESSION from Leapcell environment variable
const OP_SESSION = process.env.OP_SESSION || execSync("op signin --raw", { encoding: "utf-8" }).trim();

// Vault & Item Name from Leapcell Variables
const OP_VAULT = process.env.OP_VAULT || "DefaultVault";
const OP_ITEM = process.env.OP_ITEM || "Project Secrets";

function getSecret(key: string): string | undefined {
  try {
    return execSync(
      `op item get "${OP_ITEM}" --vault "${OP_VAULT}" --fields ${key}`,
      { encoding: "utf-8", env: { ...process.env, OP_SESSION } }
    ).trim();
  } catch (error) {
    console.error(`❌ Error retrieving secret: ${key}`, error);
    return undefined;
  }
}

export const env = {
  JWT_SECRET: getSecret("JWT_SECRET")!,
  DATABASE_URL: getSecret("DATABASE_URL")!,
  GCLOUD_STORAGE_BUCKET: getSecret("GCLOUD_STORAGE_BUCKET")!,
  GCLOUD_PROJECT_ID: getSecret("GCLOUD_PROJECT_ID")!,
  GCLOUD_SERVICE_ACCOUNT_KEY: getSecret("GCLOUD_SERVICE_ACCOUNT_KEY")!,
  FRONTEND_URL: getSecret("FRONTEND_URL")!,
  EDGE_SERVER_URL: getSecret("EDGE_SERVER_URL")!,
};
