import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore"; // Import Zustand store
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CheckAuth = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
        console.log("Token is valid:", res.data);
      } catch (error) {
        console.log("Token expired. Logging out...");
        logout(); // Remove user from localStorage & Zustand store
        navigate("/login"); // Redirect to login
      }
    };

    if (user) {
      verifyToken(); // Only check if user exists in Zustand
    }
  }, [navigate, user, logout]);

  return null;
};

export default CheckAuth;
