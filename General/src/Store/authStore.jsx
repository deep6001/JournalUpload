import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const API_URL = import.meta.env.VITE_API_URL

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      set({ user: res.data.user });

      toast.success("Login successful! 🎉"); // ✅ Success Toast

      return { success: true, message: res.data.message };
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed! ❌"); // ❌ Error Toast
      return { success: false, message: err.response?.data?.error || "Login failed" };
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      toast.success("Account created successfully! 🎉"); // ✅ Success Toast
      
      return { success: true, message: res.data.message };
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed! ❌"); // ❌ Error Toast
      return { success: false, message: err.response?.data?.error || "Signup failed" };
    }
  },

  getProfile: async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/profile`, { withCredentials: true });
      set({ user: res.data });
    } catch (err) {
      toast.error("Failed to fetch profile! ❌");
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("user");
      set({ user: null });

      toast.success("Logged out successfully! 👋"); // ✅ Success Toast

    } catch (err) {
      toast.error("Logout failed! ❌"); // ❌ Error Toast
      console.error("Logout failed:", err.response?.data?.error || err.message);
    }
  },
}));

export default useAuthStore;
