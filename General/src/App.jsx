import React from 'react';
import { Link, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Policy from "./pages/Policy";
import Home from "./pages/Home";
import Editorial from "./pages/Editorial";
import SubmissionGuideLines from "./pages/SubmissionGuideLines";
import { BookOpen, FileText, Users, FileCheck ,ListOrdered ,Building } from 'lucide-react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ReviewPolicy from './pages/ReviewPolicy';
import FormattingGuidelines from './pages/FormatingGuidelines';
import PublisherDetails from './pages/PublisherDetails';
import { ToastContainer } from 'react-toastify';
import background from './assets/background.jpg';
import Admin from './pages/Admin.jsx';
import useAuthStore from './Store/authStore';
import FileUploadForm from './pages/FileUploderForm.jsx';
import UserManagement from './pages/UserManagement.jsx';



function App() {

  const {user} = useAuthStore();
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
      <Navbar />
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className="hidden w-full md:w-1/4 lg:w-1/5 bg-gradient-to-b from-blue-50 to-indigo-50 border-r border-gray-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-serif font-bold text-indigo-800 mb-6 border-b border-indigo-100 pb-2 hidden sm:block">
              About the Journal
            </h2>
            <nav className="space-y-1">
              <Link to="/">
                <div className="flex items-center p-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200 group">
                  <BookOpen className="h-5 w-5 mr-3 text-indigo-600 group-hover:text-indigo-800" />
                  <span className="font-medium">Home</span>
                </div>
              </Link>
              <Link to="/editorial">
                <div className="flex items-center p-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200 group">
                  <Users className="h-5 w-5 mr-3 text-indigo-600 group-hover:text-indigo-800" />
                  <span className="font-medium">Editorial Board</span>
                </div>
              </Link>
              <Link to="/policy">
                <div className="flex items-center p-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200 group">
                  <FileText className="h-5 w-5 mr-3 text-indigo-600 group-hover:text-indigo-800" />
                  <span className="font-medium">Policy</span>
                </div>
              </Link>
              <Link to="/submissionguidelines">
                <div className="flex items-center p-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200 group">
                  <FileCheck className="h-5 w-5 mr-3 text-indigo-600 group-hover:text-indigo-800" />
                  <span className="font-medium">Submission Guidelines</span>
                </div>
              </Link>
              <Link to="/reviewPolicy">
                <div className="flex items-center p-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200 group">
                  <FileText className="h-5 w-5 mr-3 text-indigo-600 group-hover:text-indigo-800" />
                  <span className="font-medium">Review Policy</span>
                </div>
              </Link>
              <Link to="/format">
                <div className="flex items-center p-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200 group">
                  <ListOrdered className="h-5 w-5 mr-3 text-indigo-600 group-hover:text-indigo-800" />
                  <span className="font-medium">Formatting Guidelines</span>
                </div>
              </Link>
              <Link to="/publisherDetails">
                <div className="flex items-center p-3 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all duration-200 group">
                  <Building className="h-5 w-5 mr-3 text-indigo-600 group-hover:text-indigo-800" />
                  <span className="font-medium">Publisher Details</span>
                </div>
              </Link>
            </nav>
          </div>
          
          {/* Journal Info Section */}
          <div className="mt-8 p-6 bg-indigo-50 mx-4 rounded-lg border border-indigo-100">
            <h3 className="text-sm font-semibold text-indigo-800 uppercase tracking-wider mb-2">
              Journal Information
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              ISSN: 2023-XXXX
            </p>
            <p className="text-sm text-gray-600">
              Published quarterly
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full  bg-white p-6 md:p-10 mt-15" 
        style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover", // Ensures image covers the entire container
        backgroundPosition: "center", // Centers the image properly
        backgroundRepeat: "no-repeat", // Prevents tiling of the image
      }}>
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/format" element={<FormattingGuidelines />} />
              <Route path="/reviewPolicy" element={<ReviewPolicy />} />
              <Route path="/editorial" element={<Editorial />} />
              <Route path="/publisherDetails" element={<PublisherDetails />} />
              <Route path="/submissionguidelines" element={<SubmissionGuideLines />} />
              <Route path='/admin' element={user?.role === "admin" ? <Admin /> : <Login />} />
              <Route path='/fileupload' element={user?.role === "admin" ? <FileUploadForm /> : <Login />} />
              <Route path='/usermanagement' element={user?.role === "admin" ? <UserManagement /> : <Login />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className=" bg-gray-50 border-t border-gray-200 py-6 px-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Academic Journal. All rights reserved.</p>
        <p className="mt-1">Contact: journal@example.com</p>
      </footer>
    </div>
  );
}

export default App;