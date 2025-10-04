import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4"
      onClick={onClose} // Close modal if backdrop is clicked
    >
      {/* Modal Content */}
      <div
        className="relative bg-transparent rounded-lg w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
