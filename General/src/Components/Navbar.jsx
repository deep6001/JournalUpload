import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import {
  LogIn,
  UserPlus,
  MonitorCog,
  LogOut,
  User,
  Menu,
  X,
  BookOpen,
  FileText,
  Users,
  FileCheck,
  ListOrdered,
  Building,
  Bookmark,
  Settings

} from "lucide-react";
import useAuthStore from "../Store/authStore";

function Navbar() {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Navigation links data
  const navLinks = [
    { to: "/", label: "Home", icon: <BookOpen className="w-5 h-5" /> },
    { to: "/editorial", label: "Editorial Board", icon: <Users className="w-5 h-5" /> },
    { to: "/policy", label: "Policy", icon: <FileText className="w-5 h-5" /> },
    { to: "/submissionguidelines", label: "Submission Guidelines", icon: <FileCheck className="w-5 h-5" /> },
    { to: "/reviewPolicy", label: "Review Policy", icon: <Bookmark className="w-5 h-5" /> },
    { to: "/format", label: "Formatting Guidelines", icon: <ListOrdered className="w-5 h-5" /> },
    { to: "/publisherDetails", label: "Publisher Details", icon: <Building className="w-5 h-5" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'}`}>
      <div className="container  px-4 mx-auto">
        <nav className="flex justify-between items-center w-full">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="  rounded-lg shadow-md transition-all duration-300 group-hover:shadow-indigo-200 group-hover:shadow-lg">
              <img src={logo} className="w-12 h-12" alt="Logo" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">IJLPS</h1>
              <p className="text-xs text-gray-500 -mt-1">International Journal of Law & Public Policy Studies</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="mr-4">
              <div className="flex items-center space-x-1">
                {
                  user && user.role === 'admin' && (

                    <Link 
                    to="/admin"
                    className={`px-3 py-2 text-[12px] font-medium rounded-md transition-all duration-200 ${
                      location.pathname === '/admin'
                        ? 'text-indigo-700 bg-indigo-50' 
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                    }`}
                  >
                    Admin
                  </Link>
                  )
                }
                {navLinks.map((link) => (
                
                  <Link 
                    key={link.to} 
                    to={link.to}
                    className={`px-3 py-2 text-[12px] font-medium rounded-md transition-all duration-200 ${
                      location.pathname === link.to 
                        ? 'text-indigo-700 bg-indigo-50' 
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                {/* User Profile */}
                <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.name}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={()=>{logout()}}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" /> 
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200">
                    <LogIn className="w-4 h-4" /> Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all duration-200">
                    <UserPlus className="w-4 h-4" /> Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-lg">IJLPS</h2>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* User Section */}
            {user ? (
              <div className="px-4 pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">Logged in</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="px-4 pb-4 mb-4 border-b border-gray-100 space-y-3">
                <Link to="/login" className="block">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all">
                    <LogIn className="w-4 h-4" /> Login
                  </button>
                </Link>
                <Link to="/signup" className="block">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                    <UserPlus className="w-4 h-4" /> Sign Up
                  </button>
                </Link>
              </div>
            )}

            {/* Navigation Links */}
            <ul className="px-2 space-y-1">
              {
                user && user.role === 'admin' && (
                  <li>
                    <Link
                      to="/admin"
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        location.pathname === '/admin'
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`${location.pathname === '/admin' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <Settings className="w-5 h-5" />
                      </span>
                      <span className="font-medium">Admin</span>
                    </Link>
                  </li>
                )
              }
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === link.to
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`${location.pathname === link.to ? 'text-indigo-600' : 'text-gray-500'}`}>
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-500">
            © 2025 IJLPS. All rights reserved.
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;