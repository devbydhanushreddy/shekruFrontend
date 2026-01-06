import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: `${VITE_API_URL}`,
  withCredentials: true, // 🔴 REQUIRED for session auth
});

export default api;

export const LogoutApi = async () => {
  try {
    const res = await axios.get(`${VITE_API_URL}/logout`, {
      withCredentials: true, // ✅ needed for session cookie
    });
    return res.data; // optional, can be used if you want
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};
