import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@/assets/icons/search.svg';

/**
 * Reusable search bar component that can expand/collapse
 * 
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Current search term
 * @param {boolean} props.isExpanded - Whether search bar is expanded
 * @param {Function} props.onChange - Handler for search term changes
 * @param {Function} props.onToggle - Handler for expanding/collapsing
 * @param {boolean} props.isDisabled - Whether search is disabled
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar = ({ 
  searchTerm, 
  isExpanded, 
  onChange, 
  onToggle, 
  isDisabled 
}) => {
  return (
    <>
      {isExpanded ? (
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={onChange}
            className="bg-[#222] border border-[#333] text-white px-4 py-2 rounded-lg pl-10 w-64 focus:outline-none focus:ring-1 focus:ring-[#9d3fff]"
            disabled={isDisabled}
          />
          <img
            src={SearchIcon}
            alt="Search"
            className="absolute left-3 w-4 h-4 text-gray-400"
          />
        </div>
      ) : (
        <button
          onClick={onToggle}
          className="bg-[#222] p-2 rounded-lg hover:bg-[#303030] transition-all transform hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
          disabled={isDisabled}
        >
          <img src={SearchIcon} alt="Search" className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

SearchBar.defaultProps = {
  isDisabled: false,
};

export default SearchBar;
