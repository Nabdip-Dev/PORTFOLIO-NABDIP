import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // sends the httpOnly refresh-token cookie on /auth calls
  headers: { "Content-Type": "application/json" },
});

// Attaches the in-memory access token to every request. The token itself
// lives in AuthContext (built in a later step), which calls setAuthToken
// whenever it changes.
let accessToken: string | null = null;

export function setAuthToken(token: string | null) {
  accessToken = token;
}

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default apiClient;
