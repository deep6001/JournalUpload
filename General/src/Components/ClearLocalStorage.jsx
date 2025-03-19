import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CheckAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies

    if (!token) {
      // If token is missing in cookies, clear localStorage
      localStorage.clear();
      navigate("/login"); // Redirect user to login
    }
  }, [navigate]);

  return null;
};

export default CheckAuth;
