import axios from "axios";

// ✅ Use environment variable for backend URL
// VITE_API_URL must be set in .env.local (dev) and Netlify environment variables (prod)
const VITE_API_URL = import.meta.env.VITE_API_URL;
// const VITE_API_URL = "http://localhost:8000";
const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // 🔴 REQUIRED for session auth
});

export default api;

// ----------------- Logout API -----------------
export const LogoutApi = async () => {
  try {
    const res = await axios.get(`${VITE_API_URL}/api/logout`, {
      withCredentials: true, // ✅ needed for session cookie
    });
    return res.data;
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};
