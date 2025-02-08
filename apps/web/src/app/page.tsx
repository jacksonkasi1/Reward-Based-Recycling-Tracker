"use client";

import { useState } from "react";

import axios from "axios";

// Import environment variables
import { env } from "@/config/env";

export default function SignedUrlUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Upload file to Google Cloud Storage via signed URL
  const uploadFile = async () => {
    if (!file) return alert("Please select a file first.");
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Request a signed URL from your backend
      const response = await axios.get(`${env.NEXT_PUBLIC_API_URL}/api/get-signed-url`, {
        params: { filename: file.name, contentType: file.type },
      });

      const { signedUrl, publicUrl } = response.data;
      console.log("Signed URL:", signedUrl);
      console.log("Public URL:", publicUrl);

      // 2️⃣ Upload the file directly to Google Cloud Storage using the signed URL
      await axios.put(signedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      setUploadedUrl(publicUrl); // Save the public URL to display the uploaded image
    } catch (err: any) {
      console.error("Upload error:", err);
      setError("Failed to upload the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Upload Image to GCS</h2>

      {/* File Input */}
      <input type="file" onChange={handleFileChange} className="mb-3 block" />

      {/* Upload Button */}
      <button
        onClick={uploadFile}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Uploaded Image Preview */}
      {uploadedUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Uploaded Image:</h3>
          <img src={uploadedUrl} alt="Uploaded" className="mt-2 w-full h-auto rounded" />
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline block mt-2"
          >
            View Image
          </a>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}