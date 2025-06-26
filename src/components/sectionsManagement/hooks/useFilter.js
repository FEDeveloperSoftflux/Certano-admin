import { useState, useCallback } from 'react';

/**
 * Custom hook for filtering sections data
 * @returns {Object} Filter state and handlers
 */
const useFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  /**
   * Updates the search term
   * @param {string} term - Search term
   */
  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);
  
  /**
   * Updates the status filter
   * @param {string} status - Status filter value
   */
  const updateStatusFilter = useCallback((status) => {
    setStatusFilter(status);
  }, []);
  
  /**
   * Resets all filters to default values
   */
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
  }, []);
  
  /**
   * Filters section data based on current filters
   * @param {Array} sections - Array of section objects
   * @returns {Array} Filtered sections
   */
  const applyFilters = useCallback((sections) => {
    return sections.filter(section => {
      // Apply search term filter
      const matchesSearch = searchTerm === '' || 
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply status filter
      const matchesStatus = statusFilter === 'all' || 
        section.status.toLowerCase() === statusFilter.toLowerCase();
      
      // Return true if all filters match
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);
  
  return {
    searchTerm,
    statusFilter,
    updateSearchTerm,
    updateStatusFilter,
    resetFilters,
    applyFilters,
  };
};

export default useFilter;
