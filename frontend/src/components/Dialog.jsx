// DialogBox.jsx
import React from 'react';

const DialogBox = ({ isOpen, onClose, title, children, actionLabel, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onAction}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
