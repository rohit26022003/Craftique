// components/LoginSignupModal.jsx
import React from "react";

const LoginSignupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login / Signup</h2>
        {/* Your login/signup form goes here */}
        <button onClick={onClose} className="mt-4 bg-black text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
