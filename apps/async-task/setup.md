# Async Task

## **🔐 Setting Up Google Cloud Storage Authentication**

To authenticate your application with **Google Cloud Storage**, you need to use a **Service Account Key JSON file**. Instead of storing the raw JSON file, we **convert it into a Base64 string** for easy environment variable storage.

### **1️⃣ Convert `gcs-keys.json` to Base64**

Run the following command in your terminal:

```sh
base64 -w 0 path/to/gcs-keys.json
```

- **For macOS users**, use:

  ```sh
  base64 path/to/gcs-keys.json
  ```

This will output a **long encoded string**.

---

### **2️⃣ Store the Encoded Key in Your `.env` File**

Copy the output of the previous step and add it to your `.env` file:

```
GCLOUD_SERVICE_ACCOUNT_KEY=your-base64-encoded-json
GCLOUD_PROJECT_ID=your-google-cloud-project-id
GCLOUD_STORAGE_BUCKET=your-gcs-bucket-name
```

> **Note:** Replace `your-base64-encoded-json` with the actual Base64 string.

---

### **3️⃣ Decode the Key in Your Application**

Modify your environment configuration file (`env.ts` or `config.ts`) to **decode the Base64 string before using it**:

```ts
import dotenv from "dotenv";
dotenv.config();

export const env = {
  GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID!,
  GCLOUD_STORAGE_BUCKET: process.env.GCLOUD_STORAGE_BUCKET!,
  GCLOUD_SERVICE_ACCOUNT_KEY: process.env.GCLOUD_SERVICE_ACCOUNT_KEY
    ? JSON.parse(Buffer.from(process.env.GCLOUD_SERVICE_ACCOUNT_KEY, "base64").toString("utf-8"))
    : undefined, // Use default credentials if running on GCP
};
```

---

### **4️⃣ Use the Credentials in Google Cloud Storage**

Now, update the Google Cloud Storage client to use the **decoded credentials**:

```ts
import { Storage } from "@google-cloud/storage";
import { env } from "@/config/env";

const storage = new Storage({
  projectId: env.GCLOUD_PROJECT_ID,
  credentials: env.GCLOUD_SERVICE_ACCOUNT_KEY, // Decoded JSON credentials
});

export const bucket = storage.bucket(env.GCLOUD_STORAGE_BUCKET);
```

---

### **✅ Done!**

Now your application can securely authenticate with **Google Cloud Storage** without exposing raw JSON files.
