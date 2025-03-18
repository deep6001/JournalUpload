import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password validation checks
  const passwordLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!passwordLength || !hasUppercase || !hasNumber || !passwordsMatch) {
      setError("Password must be at least 8 characters, contain an uppercase letter, and a number.");
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  px-6">
      <div className="sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-serif font-bold text-white">Create Your Account</h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-md p-8 shadow-lg rounded-lg border border-white/20">
          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center mb-4">{success}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full bg-gray-900/30 text-white pl-10 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-gray-900/30 text-white pl-10 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-gray-900/30 text-white pl-10 pr-10 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicators */}
              <div className="mt-2 space-y-1 text-xs text-gray-400">
                <p className={`flex items-center ${passwordLength ? "text-green-400" : "text-gray-400"}`}>
                  {passwordLength && <CheckCircle className="h-4 w-4 text-green-400 mr-1" />}
                  At least 8 characters
                </p>
                <p className={`flex items-center ${hasUppercase ? "text-green-400" : "text-gray-400"}`}>
                  {hasUppercase && <CheckCircle className="h-4 w-4 text-green-400 mr-1" />}
                  One uppercase letter
                </p>
                <p className={`flex items-center ${hasNumber ? "text-green-400" : "text-gray-400"}`}>
                  {hasNumber && <CheckCircle className="h-4 w-4 text-green-400 mr-1" />}
                  One number
                </p>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full bg-gray-900/30 text-white pl-10 pr-10 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
