import React from 'react';
import PropTypes from 'prop-types';
import FilterIcon from '@/assets/icons/filter.svg';
import { FILTER_OPTIONS } from '../../utils/constants';

/**
 * Reusable filter dropdown component for tables
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether dropdown is open
 * @param {Function} props.onToggle - Handler for toggling dropdown
 * @param {Function} props.onApplyFilter - Handler for applying a filter
 * @param {Function} props.onClearFilters - Handler for clearing filters
 * @param {string|null} props.currentFilter - Currently applied filter
 * @param {boolean} props.isApplied - Whether a filter is applied
 * @param {boolean} props.isDisabled - Whether filter is disabled
 * @param {Object} props.dropdownRef - Ref for click outside detection
 * @returns {JSX.Element} FilterDropdown component
 */
const FilterDropdown = ({
  isOpen,
  onToggle,
  onApplyFilter,
  onClearFilters,
  currentFilter,
  isApplied,
  isDisabled,
  dropdownRef
}) => {
  // Safety check for handlers
  const safeHandler = (handler, ...args) => {
    if (isDisabled) return;
    if (typeof handler !== 'function') {
      console.error('Invalid handler provided to FilterDropdown');
      return;
    }
    try {
      handler(...args);
    } catch (error) {
      console.error('Error in FilterDropdown handler:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => safeHandler(onToggle)}
        className={`p-2 rounded-lg transition-all transform hover:scale-105 ${isApplied ? 'bg-purple-600/20' : 'bg-[#222]'} ${isOpen ? 'ring-2 ring-purple-500/50' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isDisabled}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          <img src={FilterIcon} alt="Filter" className="w-5 h-5" />
          {isApplied && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl z-20 overflow-hidden animate-fadeIn">
          <div className="p-2">
            <h3 className="text-white text-sm font-semibold mb-2 px-2 flex justify-between items-center">
              <span>Filter by</span>
              {isApplied && (
                <button
                  onClick={() => safeHandler(onClearFilters)}
                  className="text-xs text-purple-400 hover:text-purple-300"
                  disabled={isDisabled}
                >
                  Clear
                </button>
              )}
            </h3>
            <div className="space-y-1">
              {FILTER_OPTIONS.map((option) => (
                <FilterOption
                  key={option.value}
                  option={option}
                  isSelected={currentFilter === option.value}
                  onClick={() => safeHandler(onApplyFilter, option.value)}
                  isDisabled={isDisabled}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Single filter option component
 */
const FilterOption = ({ option, isSelected, onClick, isDisabled }) => (
  <button 
    className={`w-full text-left px-3 py-2 text-white text-sm hover:bg-[#222] rounded-md transition-colors flex items-center ${isSelected ? 'bg-[#222]' : ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={onClick}
    disabled={isDisabled}
  >
    {isSelected && (
      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
    )}
    <span>{option.label}</span>
  </button>
);

FilterDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  currentFilter: PropTypes.string,
  isApplied: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  dropdownRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
};

FilterOption.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

FilterDropdown.defaultProps = {
  isDisabled: false,
  currentFilter: null,
};

FilterOption.defaultProps = {
  isDisabled: false,
};

export default FilterDropdown;
