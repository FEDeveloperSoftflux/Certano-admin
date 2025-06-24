import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing table row selection
 * @param {Array} users - Array of user data
 * @returns {Object} Selection state and handlers
 */
const useSelection = (users) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  /**
   * Toggle select all functionality
   * Selects or deselects all rows
   */
  const toggleSelectAll = useCallback(() => {
    setSelectAll(prevSelectAll => {
      if (prevSelectAll) {
        setSelectedRows([]);
        return false;
      } else {
        // Check if users array is valid
        if (!Array.isArray(users) || users.length === 0) {
          return false;
        }
        setSelectedRows(users.map((_, index) => index));
        return true;
      }
    });
  }, [users]);

  /**
   * Toggle selection of a specific row
   * @param {number} index - Index of the row to toggle
   */
  const toggleRowSelection = useCallback((index) => {
    // Validate index
    if (!Array.isArray(users) || index < 0 || index >= users.length) {
      console.error(`Invalid row index: ${index}`);
      return;
    }
    
    setSelectedRows(prevSelectedRows => {
      const newSelectedRows = prevSelectedRows.includes(index)
        ? prevSelectedRows.filter(i => i !== index)
        : [...prevSelectedRows, index];
      
      // Update selectAll state based on whether all rows are selected
      if (Array.isArray(users) && users.length > 0) {
        setSelectAll(newSelectedRows.length === users.length);
      }
      
      return newSelectedRows;
    });
  }, [users]);

  /**
   * Get selected user objects from row indices
   * @returns {Array} Array of selected user objects
   */
  const getSelectedUsers = useCallback(() => {
    if (!Array.isArray(users)) {
      return [];
    }
    
    return selectedRows
      .filter(index => index >= 0 && index < users.length)
      .map(index => users[index]);
  }, [users, selectedRows]);

  /**
   * Clear all selections
   */
  const clearSelections = useCallback(() => {
    setSelectedRows([]);
    setSelectAll(false);
  }, []);

  /**
   * Removes a specific user from selection by ID
   * @param {string|number} userId - ID of the user to remove
   */
  const removeUserFromSelection = useCallback((userId) => {
    if (!userId) return;
    
    setSelectedRows(prevSelectedRows => {
      const userIndex = Array.isArray(users) 
        ? users.findIndex(u => u && u.id === userId) 
        : -1;
      
      if (userIndex >= 0 && prevSelectedRows.includes(userIndex)) {
        const newSelectedRows = prevSelectedRows.filter(i => i !== userIndex);
        // Update selectAll state
        if (Array.isArray(users) && users.length > 0) {
          setSelectAll(newSelectedRows.length === users.length);
        }
        return newSelectedRows;
      }
      
      return prevSelectedRows;
    });
  }, [users]);

  // Reset selection if users array changes significantly
  useEffect(() => {
    // Check if any selected indices are now invalid
    const hasInvalidSelection = selectedRows.some(
      index => !Array.isArray(users) || index < 0 || index >= users.length
    );
    
    if (hasInvalidSelection) {
      clearSelections();
    }
  }, [users, selectedRows, clearSelections]);

  // Update selectAll state when users array changes
  useEffect(() => {
    if (Array.isArray(users) && users.length > 0 && selectedRows.length === users.length) {
      setSelectAll(true);
    } else if (selectedRows.length === 0) {
      setSelectAll(false);
    }
  }, [users, selectedRows]);

  return {
    selectedRows,
    selectAll,
    toggleSelectAll,
    toggleRowSelection,
    getSelectedUsers,
    clearSelections,
    removeUserFromSelection,
  };
};

export default useSelection;
