import React from 'react';
import { PlusCircle } from 'lucide-react';

/**
 * Displays a message when no data is available
 * @param {Object} props - Component props
 * @param {string} props.message - Message to display
 * @param {string} props.ctaText - Call to action button text
 * @param {Function} props.onCta - Handler for CTA button click
 * @returns {JSX.Element} NoDataMessage component
 */
const NoDataMessage = ({ 
  message = 'No data available', 
  ctaText = 'Add New', 
  onCta 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-[#222] rounded-full flex items-center justify-center mb-4">
        <PlusCircle size={32} className="text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{message}</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-md">
        Get started by creating a new section for your website
      </p>
      {onCta && (
        <button
          onClick={onCta}
          className="px-4 py-2 bg-gradient-to-r from-[#7d38e5] to-[#9d3fff] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};

export default NoDataMessage;
