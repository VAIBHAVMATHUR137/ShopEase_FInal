import React from "react";
import { useNavigate } from "react-router-dom";
const SuccessDialog = ({ isOpen, onClose, message }) => {
    const navigate=useNavigate()
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-lg transform transition-all ease-in-out duration-300 scale-100">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
          <p className="text-bold text-black-500 text-center mb-4">{message}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-pink-500 hover:to-purple-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            I want some more shopping
          </button>
          <br />
          <button
            onClick={()=>navigate("/cart")}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-pink-500 hover:to-purple-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
           Go To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;
