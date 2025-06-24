import React from 'react';

/**
 * Loading overlay component
 * @returns {JSX.Element} LoadingOverlay component
 */
const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-[#1a1a1a]/80 flex items-center justify-center z-10 backdrop-blur-sm">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full border-4 border-[#9d3fff]/30 border-t-[#9d3fff] animate-spin"></div>
      <span className="mt-4 text-gray-400">Loading...</span>
    </div>
  </div>
);

export default LoadingOverlay;
