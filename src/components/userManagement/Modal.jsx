import React from 'react';

// Base Modal component with glassmorphic effect
export const Modal = ({ isOpen, onClose, children, width = '400px' }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        className="relative bg-glass p-8 rounded-2xl shadow-2xl border border-white/10 animate-fadeIn"
        style={{ width }}
      >
        {children}
      </div>
    </div>
  );
};

// Reusable close button component
export const ModalCloseButton = ({ onClose }) => (
  <button 
    onClick={onClose}
    className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
  >
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
);

// Success modal with checkmark animation
export const SuccessModal = ({ isOpen, message }) => {
  if (!isOpen) return null;
  
  return (
    <Modal isOpen={isOpen} width="300px">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          <svg className="w-8 h-8 text-green-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" className="success-check" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Successfully Done!</h2>
        <p className="text-gray-400">{message}</p>
      </div>
    </Modal>
  );
};

// Gradient button component
export const GradientButton = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg bg-gradient-enhanced btn-gradient text-white font-medium hover:opacity-90 transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

// Secondary button component
export const SecondaryButton = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg bg-[#333] text-white hover:bg-[#444] transition-colors ${className}`}
  >
    {children}
  </button>
);
