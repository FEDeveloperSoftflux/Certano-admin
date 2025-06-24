import React, { useState } from 'react';

/**
 * Dropdown component for filtering sections
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of option objects with value and label
 * @param {string} props.label - Dropdown label
 * @param {Function} props.onChange - Handler for option change
 * @param {boolean} props.disabled - Disabled state
 * @returns {JSX.Element} FilterDropdown component
 */
const FilterDropdown = ({ 
  options = [], 
  label = 'Filter', 
  onChange = () => {}, 
  disabled = false 
}) => {
  const [selected, setSelected] = useState(options[0]?.value || '');
  
  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };
  
  return (
    <div className="relative">
      <select
        className="block w-full p-2 pl-3 pr-10 text-sm border rounded-lg appearance-none
                  bg-[#222] border-[#333] text-white
                  focus:ring-[#9d3fff] focus:border-[#9d3fff]
                  disabled:opacity-50 disabled:cursor-not-allowed"
        value={selected}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg 
          className="w-4 h-4 text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </div>
  );
};

export default FilterDropdown;
