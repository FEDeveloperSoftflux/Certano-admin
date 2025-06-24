import React from 'react';
import PropTypes from 'prop-types';
import { safeHandler } from '../../utils/helpers';

/**
 * Pagination component for tables
 * 
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Handler for page changes
 * @param {boolean} props.isDisabled - Whether pagination is disabled
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({ 
  currentPage = 1, 
  totalPages = 10, 
  onPageChange = () => {}, 
  isDisabled = false 
}) => {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        // Show ellipsis if current page is further from start
        pages.push('...');
      }
      
      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        // Show ellipsis if current page is further from end
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page === '...' || page === currentPage || isDisabled) return;
    safeHandler(onPageChange, page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !isDisabled) {
      safeHandler(onPageChange, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !isDisabled) {
      safeHandler(onPageChange, currentPage + 1);
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="flex items-center space-x-2">
        <button 
          onClick={handlePrevPage}
          className="px-3 py-1 rounded-md bg-[#333] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1 || isDisabled}
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="text-gray-400">...</span>
          ) : (
            <button 
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${page === currentPage ? 'bg-[#222]' : 'bg-[#333]'} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={isDisabled}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )
        ))}
        
        <button 
          onClick={handleNextPage}
          className="px-3 py-1 rounded-md bg-[#333] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages || isDisabled}
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Pagination;
