import React from 'react';
import { SearchBar, FilterDropdown } from './common';

/**
 * Table actions component for sections table
 * @param {Object} props - Component props
 * @param {number} props.selectedCount - Number of selected rows
 * @param {boolean} props.isProcessing - Processing state
 * @param {boolean} props.isLoading - Loading state
 * @param {Function} props.onDelete - Handler for delete action
 * @param {Function} props.onAddSection - Handler for add section action
 * @returns {JSX.Element} TableActions component
 */
const TableActions = ({ 
  selectedCount = 0, 
  isProcessing = false, 
  isLoading = false,
  onDelete,
  onAddSection
}) => {
  // Disabled state for interactive elements
  const isDisabled = isLoading || isProcessing;
  
  // Status options for filter
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-[#333] gap-4">
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <SearchBar 
          placeholder="Search sections..." 
          disabled={isDisabled}
        />
        
        <FilterDropdown 
          options={statusOptions} 
          label="Status" 
          disabled={isDisabled}
        />
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isDisabled}
            className="px-3 py-1.5 text-sm text-red-400 border border-red-400/30 rounded-lg 
                      hover:bg-red-400/10 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            Delete {selectedCount > 1 ? `(${selectedCount})` : ''}
          </button>
        )}
        
        <button
          type="button"
          onClick={onAddSection}
          disabled={isDisabled}
          className="px-4 py-2 text-sm bg-gradient-enhanced text-white rounded-lg 
                    hover:opacity-90 transition-colors disabled:opacity-50 disabled:pointer-events-none 
                    flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Section
        </button>
      </div>
    </div>
  );
};

export default TableActions;
