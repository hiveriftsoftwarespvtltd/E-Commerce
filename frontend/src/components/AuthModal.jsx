import React from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    onClose(); // close modal after redirect
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      {/* Modal Box */}
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center">
        
        <h2 className="text-xl font-semibold mb-3">
          Login Required
        </h2>

        <p className="text-gray-600 mb-6">
          To use this feature, you need to login first.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
             <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLogin}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>

         
        </div>
      </div>
    </div>
  );
};

export default AuthModal;