import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CheckAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        localStorage.clear();
        Cookies.remove("token"); // Remove token from cookies
        navigate("/login"); // Redirect user to login
      }
    }
    else{
        localStorage.clear();
        navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default CheckAuth;
