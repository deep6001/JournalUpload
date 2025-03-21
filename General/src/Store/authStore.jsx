import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = create((set) => ({
  user: null, // Start as null instead of using localStorage

  fetchUser: async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/profile`, { withCredentials: true });
      set({ user: res.data });
    } catch (err) {
      set({ user: null }); // Ensure the user is set to null if not authenticated
    }
  },

  login: async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
      set({ user: res.data.user });

      toast.success("Login successful! 🎉");
      return { success: true, message: res.data.message };
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed! ❌");
      return { success: false, message: err.response?.data?.error || "Login failed" };
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      toast.success("Account created successfully! 🎉");
      return { success: true, message: res.data.message };
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed! ❌");
      return { success: false, message: err.response?.data?.error || "Signup failed" };
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      set({ user: null });

      toast.success("Logged out successfully! 👋");
    } catch (err) {
      toast.error("Logout failed! ❌");
      console.error("Logout failed:", err.response?.data?.error || err.message);
    }
  },
}));

export default useAuthStore;
