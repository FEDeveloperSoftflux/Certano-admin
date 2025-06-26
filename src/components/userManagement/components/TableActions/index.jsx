import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/common/Button';
import SearchIcon from '@/assets/icons/search.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import AddIcon from '@/assets/icons/add.svg';
import useUserManagement from '../../hooks/useUserManagement';
import FilterDropdown from '../common/FilterDropdown';
import SearchBar from '../common/SearchBar';

/**
 * TableActions component for user management page
 * Contains search, filter, and action buttons
 * 
 * @param {Object} props - Component props
 * @param {number} props.selectedCount - Number of selected rows
 * @param {boolean} props.isProcessing - If true, actions are disabled
 * @param {boolean} props.isLoading - If true, shows loading state
 * @param {Function} props.onDelete - Handler for delete action
 * @param {Function} props.onAddUser - Handler for add user action
 * @returns {JSX.Element} TableActions component
 */
const TableActions = ({
  selectedCount,
  isProcessing,
  isLoading,
  onDelete,
  onAddUser
}) => {
  const {
    searchTerm,
    setSearchTerm,
    isSearchExpanded,
    setIsSearchExpanded,
    filterDropdownOpen,
    filterApplied,
    currentFilter,
    dropdownRef,
    toggleSearch,
    handleSearchChange,
    toggleFilterDropdown,
    applyFilter,
    clearFilters
  } = useUserManagement();

  // Safe action handler with validation
  const handleAction = (action, ...args) => {
    if (isProcessing || isLoading) {
      console.log('Cannot perform action while processing or loading');
      return;
    }
    
    if (typeof action !== 'function') {
      console.error('Invalid action handler');
      return;
    }
    
    try {
      action(...args);
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <SearchBar
          searchTerm={searchTerm}
          isExpanded={isSearchExpanded}
          onChange={handleSearchChange}
          onToggle={toggleSearch}
          isDisabled={isProcessing || isLoading}
        />
        
        <FilterDropdown
          isOpen={filterDropdownOpen}
          onToggle={toggleFilterDropdown}
          onApplyFilter={applyFilter}
          onClearFilters={clearFilters}
          currentFilter={currentFilter}
          isApplied={filterApplied}
          isDisabled={isProcessing || isLoading}
          dropdownRef={dropdownRef}
        />

        {selectedCount > 0 && (
          <button
            onClick={() => handleAction(onDelete)}
            className="bg-white p-2 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
            aria-label="Delete selected users"
            disabled={isProcessing}
          >
            <div className="relative">
              <img src={DeleteIcon} alt="Delete" className="w-5 h-5 filter brightness-0" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {selectedCount}
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <select 
            className="bg-[#222] border border-[#333] text-white px-4 py-2 rounded-lg appearance-none pr-8 focus:outline-none focus:ring-1 focus:ring-[#9d3fff] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing || isLoading}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Expired</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <Button
          variant="primary"
          className={`px-4 py-2 bg-gradient-primary shadow-sm transform hover:scale-105 transition-all ${(isProcessing || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleAction(onAddUser)}
          disabled={isProcessing || isLoading}
        >
          <span className="flex items-center text-black font-semibold">
            <img src={AddIcon} alt="Add" className="w-4 h-4 mr-2" />
            Add User
          </span>
        </Button>
      </div>
    </div>
  );
};

TableActions.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  isProcessing: PropTypes.bool,
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
};

TableActions.defaultProps = {
  isProcessing: false,
  isLoading: false,
};

export default TableActions;
