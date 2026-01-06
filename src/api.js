import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // 🔴 REQUIRED for session auth
});

export default api;

export const LogoutApi = async () => {
  try {
    const res = await axios.get("http://localhost:8000/logout", {
      withCredentials: true, // ✅ needed for session cookie
    });
    return res.data; // optional, can be used if you want
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};
