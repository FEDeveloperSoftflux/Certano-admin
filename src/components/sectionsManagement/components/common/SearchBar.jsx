import React from 'react';

/**
 * Search bar component for filtering sections
 * @param {Object} props - Component props
 * @param {string} props.placeholder - Placeholder text
 * @param {Function} props.onChange - Handler for input change
 * @param {boolean} props.disabled - Disabled state
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar = ({ 
  placeholder = 'Search...', 
  onChange = () => {}, 
  disabled = false 
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg 
          className="w-4 h-4 text-gray-500" 
          aria-hidden="true" 
          fill="none" 
          viewBox="0 0 20 20"
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full p-2 pl-10 text-sm border rounded-lg
                  bg-[#222] border-[#333] text-white
                  focus:ring-[#9d3fff] focus:border-[#9d3fff]
                  disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchBar;
