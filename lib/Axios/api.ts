import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
});

export function parseApiError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    // try common locations for error message
    const data = err.response?.data as
      | { error?: string; message?: string }
      | undefined;
    return data?.error || data?.message || err.message || "Request failed";
  }
  if (err instanceof Error) return err.message;
  try {
    return String(err);
  } catch {
    return "Unknown error";
  }
}

export default api;
