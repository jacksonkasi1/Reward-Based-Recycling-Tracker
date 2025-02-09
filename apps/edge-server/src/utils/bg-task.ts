import axios from "axios";

/**
 * Calls the background task server for validation processing.
 *
 * @param bgTaskServerUrl - The base URL of the background task server.
 * @param headers - The request headers.
 * @param body - The request body.
 */
export async function callBackgroundTask(bgTaskServerUrl: string, headers: Headers, body: any) {
  try {
    const url = `${bgTaskServerUrl}/api/process/validate`;

    const response = await axios.post(url, body, {
      headers: Object.fromEntries(headers.entries()), // Convert Headers to object
    });

    console.log("✅ Background Task Response:", response.data);

    return { success: true, message: "Submitted successfully, points will update soon" };
  } catch (error) {
    console.error("❌ Error calling background task server:", error);
    return { success: false, message: "Failed to submit request to background task server" };
  }
}
