import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing search and filter functionality
 * @returns {Object} Filter state and handlers
 */
const useFilter = () => {
  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  // Filter states
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Click outside handler for filter dropdown
  const dropdownRef = useRef(null);

  /**
   * Toggles search input expansion
   */
  const toggleSearch = useCallback(() => {
    setIsSearchExpanded(prev => !prev);
    if (isSearchExpanded) {
      setSearchTerm("");
    }
  }, [isSearchExpanded]);

  /**
   * Handles search term changes
   * @param {Object} event - Input change event
   */
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  /**
   * Toggles filter dropdown visibility
   */
  const toggleFilterDropdown = useCallback(() => {
    setFilterDropdownOpen(prev => !prev);
  }, []);

  /**
   * Applies a filter type
   * @param {string} filterType - Type of filter to apply
   */
  const applyFilter = useCallback((filterType) => {
    if (!filterType || typeof filterType !== 'string') {
      console.error('Invalid filter type:', filterType);
      return;
    }
    
    // Set loading state to indicate filtering operation
    setIsLoading(true);
    
    // Update filter state
    setCurrentFilter(filterType);
    setFilterApplied(true);
    setFilterDropdownOpen(false);
    
    // Simulate API call for filtering data
    setTimeout(() => {
      // Here you would add logic to actually filter the data
      console.log(`Filtering by ${filterType}`);
      setIsLoading(false);
    }, 500);
  }, []);

  /**
   * Clears applied filters
   */
  const clearFilters = useCallback(() => {
    setFilterApplied(false);
    setCurrentFilter(null);
    setFilterDropdownOpen(false);
    setSearchTerm("");
  }, []);

  /**
   * Filters user data based on search term and applied filters
   * @param {Array} users - Array of user data to filter
   * @returns {Array} Filtered users
   */
  const filterUsers = useCallback((users) => {
    if (!Array.isArray(users)) return [];
    
    let filteredUsers = [...users];
    
    // Apply search term filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      filteredUsers = filteredUsers.filter(user => 
        (user.name && user.name.toLowerCase().includes(lowerSearchTerm)) ||
        (user.email && user.email.toLowerCase().includes(lowerSearchTerm)) ||
        (user.id && user.id.toString().toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // Apply selected filter
    if (filterApplied && currentFilter) {
      switch (currentFilter) {
        case 'status':
          // Filter by status
          break;
        case 'plan':
          // Filter by plan
          break;
        case 'support':
          // Filter by support status
          break;
        case 'days':
          // Filter by subscription days
          break;
        default:
          break;
      }
    }
    
    return filteredUsers;
  }, [searchTerm, filterApplied, currentFilter]);

  // Effect to handle click outside filter dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterDropdownOpen]);

  return {
    // Search states
    searchTerm,
    setSearchTerm,
    isSearchExpanded,
    setIsSearchExpanded,
    
    // Filter states
    filterDropdownOpen,
    filterApplied,
    currentFilter,
    isLoading,
    dropdownRef,
    
    // Handlers
    toggleSearch,
    handleSearchChange,
    toggleFilterDropdown,
    applyFilter,
    clearFilters,
    filterUsers,
  };
};

export default useFilter;
