import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable loading overlay component with spinner
 * 
 * @param {Object} props - Component props
 * @param {string} [props.message] - Optional loading message
 * @param {string} [props.className] - Additional classes for the container
 * @param {string} [props.spinnerSize] - Size of the spinner (sm, md, lg)
 * @param {string} [props.spinnerColor] - Color of the spinner
 * @param {number} [props.opacity] - Opacity level for the backdrop (0-100)
 * @returns {JSX.Element} LoadingOverlay component
 */
const LoadingOverlay = ({ 
  message = 'Loading...', 
  className = '', 
  spinnerSize = 'md',
  spinnerColor = 'purple-500',
  opacity = 20
}) => {
  // Map spinner sizes to actual pixel values
  const sizeMap = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  const spinnerClass = sizeMap[spinnerSize] || sizeMap.md;
  const backdropOpacity = `bg-black/${opacity}`;

  return (
    <div className={`absolute inset-0 ${backdropOpacity} backdrop-blur-sm z-30 flex items-center justify-center rounded-xl animate-fadeIn ${className}`}>
      <div className="flex flex-col items-center">
        <div className={`${spinnerClass} border-t-${spinnerColor} border-r-transparent border-b-${spinnerColor} border-l-transparent rounded-full animate-spin mb-2`}></div>
        {message && <p className="text-white text-sm">{message}</p>}
      </div>
    </div>
  );
};

/**
 * Simplified loading spinner without overlay
 */
export const LoadingSpinner = ({ 
  size = 'md', 
  color = 'purple-500',
  className = ''
}) => {
  const sizeMap = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinnerClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`${spinnerClass} border-t-${color} border-r-transparent border-b-${color} border-l-transparent rounded-full animate-spin ${className}`}></div>
  );
};

LoadingOverlay.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  spinnerSize: PropTypes.oneOf(['sm', 'md', 'lg']),
  spinnerColor: PropTypes.string,
  opacity: PropTypes.number,
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  color: PropTypes.string,
  className: PropTypes.string,
};

export default LoadingOverlay;
