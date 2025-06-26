import React from 'react';

/**
 * Pagination component for sections table
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Handler for page change
 * @param {boolean} props.isDisabled - Disabled state
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  isDisabled = false
}) => {
  // Create page numbers array
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to show
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate range of pages to show
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      // Add page numbers in range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add last page and ellipsis if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // No pagination needed if only one page
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between p-4 border-t border-[#333]" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-400">
          Showing page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      
      <div className="flex flex-1 justify-between sm:justify-end space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isDisabled}
          className="px-3 py-1 text-sm bg-[#222] text-white rounded-md
                    hover:bg-[#333] transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          Previous
        </button>
        
        <div className="hidden md:flex space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={`page-${index}`}
              onClick={() => typeof page === 'number' ? onPageChange(page) : null}
              disabled={page === '...' || page === currentPage || isDisabled}
              className={`px-3 py-1 text-sm rounded-md transition-colors
                ${page === currentPage 
                  ? 'bg-[#9d3fff]/20 text-[#9d3fff] border border-[#9d3fff]/30' 
                  : page === '...' 
                    ? 'text-gray-400 cursor-default' 
                    : 'bg-[#222] text-white hover:bg-[#333]'
                } ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isDisabled}
          className="px-3 py-1 text-sm bg-[#222] text-white rounded-md
                    hover:bg-[#333] transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
