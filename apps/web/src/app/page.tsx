"use client";

import { useState } from "react";
import axios from "axios";

// Ensure you have the correct API base URL configured in your environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// TypeScript interface for API response
interface SignedUrlResponse {
  message: string;
  data: {
    signedUrl: string;
    publicUrl: string;
  };
}

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
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Request a signed URL from your backend
      const { data }: { data: SignedUrlResponse } = await axios.get(
        `${API_URL}/api/upload/signed-url`,
        { params: { filename: file.name, contentType: file.type } }
      );

      const { signedUrl, publicUrl } = data.data;

      console.log("Signed URL:", signedUrl);
      console.log("Public URL:", publicUrl);

      // 2️⃣ Upload the file directly to Google Cloud Storage using the signed URL
      await axios.put(signedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // ✅ Successfully uploaded, set the public URL
      setUploadedUrl(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to upload the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-md w-full max-w-md mx-auto bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Image to GCS</h2>

      {/* File Input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-3 block w-full border rounded p-2 text-gray-700"
        accept="image/*"
      />

      {/* Upload Button */}
      <button
        onClick={uploadFile}
        disabled={!file || loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Uploaded Image Preview */}
      {uploadedUrl && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h3 className="text-lg font-medium text-gray-800">Uploaded Image:</h3>
          <img src={uploadedUrl} alt="Uploaded" className="mt-2 w-full h-auto rounded shadow" />
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

      {/* Show API Response Link */}
      {uploadedUrl && (
        <p className="mt-2 text-sm text-gray-700">
          🔗 Image URL:{" "}
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            {uploadedUrl}
          </a>
        </p>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}