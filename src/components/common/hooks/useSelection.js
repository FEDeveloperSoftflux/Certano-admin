import { useState, useCallback, useEffect } from 'react';

/**
 * Generic hook for managing table row selection
 * Works with any array of objects that have an 'id' property
 * 
 * @param {Array} data - Array of data objects (users, sections, etc.)
 * @param {string} [idKey='id'] - Property name to use as unique identifier
 * @returns {Object} Selection state and handlers
 */
const useSelection = (data = [], idKey = 'id') => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  /**
   * Toggle selection of a single row by ID
   * @param {string|number} id - ID of the row to toggle
   */
  const selectRow = useCallback((id) => {
    if (id === undefined || id === null) {
      console.error('Invalid ID provided to selectRow:', id);
      return;
    }

    setSelectedRows(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id];
      
      return newSelection;
    });
  }, []);

  /**
   * Toggle selection of all rows
   */
  const selectAll = useCallback(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    if (isAllSelected) {
      // Deselect all
      setSelectedRows([]);
    } else {
      // Select all
      const allIds = data
        .filter(item => item && item[idKey] !== undefined && item[idKey] !== null)
        .map(item => item[idKey]);
      setSelectedRows(allIds);
    }
  }, [data, isAllSelected, idKey]);

  /**
   * Toggle selection by index (for backwards compatibility)
   * @param {number} index - Index of the row to toggle
   */
  const toggleRowSelection = useCallback((index) => {
    if (!Array.isArray(data) || index < 0 || index >= data.length) {
      console.error(`Invalid row index: ${index}`);
      return;
    }
    
    const item = data[index];
    if (item && item[idKey] !== undefined && item[idKey] !== null) {
      selectRow(item[idKey]);
    }
  }, [data, idKey, selectRow]);

  /**
   * Get selected items from the data array
   * @returns {Array} Array of selected items
   */
  const getSelectedItems = useCallback(() => {
    if (!Array.isArray(data)) {
      return [];
    }
    
    return data.filter(item => 
      item && 
      item[idKey] !== undefined && 
      item[idKey] !== null && 
      selectedRows.includes(item[idKey])
    );
  }, [data, selectedRows, idKey]);

  /**
   * Clear all selections
   */
  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  /**
   * Remove a specific item from selection by ID
   * @param {string|number} id - ID of the item to remove
   */
  const removeFromSelection = useCallback((id) => {
    if (id === undefined || id === null) return;
    
    setSelectedRows(prev => prev.filter(selectedId => selectedId !== id));
  }, []);

  /**
   * Check if a specific row is selected
   * @param {string|number} id - ID to check
   * @returns {boolean} Whether the row is selected
   */
  const isRowSelected = useCallback((id) => {
    return selectedRows.includes(id);
  }, [selectedRows]);

  // Update isAllSelected state when selection changes
  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setIsAllSelected(false);
      return;
    }

    const validItems = data.filter(item => 
      item && item[idKey] !== undefined && item[idKey] !== null
    );
    
    const allSelected = validItems.length > 0 && 
      validItems.every(item => selectedRows.includes(item[idKey]));
    
    setIsAllSelected(allSelected);
  }, [data, selectedRows, idKey]);

  // Clear selection when data changes significantly
  useEffect(() => {
    if (!Array.isArray(data)) {
      setSelectedRows([]);
      return;
    }

    // Check if any selected IDs are no longer valid
    const validIds = data
      .filter(item => item && item[idKey] !== undefined && item[idKey] !== null)
      .map(item => item[idKey]);
    
    const hasInvalidSelection = selectedRows.some(id => !validIds.includes(id));
    
    if (hasInvalidSelection) {
      // Keep only valid selections
      const validSelections = selectedRows.filter(id => validIds.includes(id));
      setSelectedRows(validSelections);
    }
  }, [data, selectedRows, idKey]);

  return {
    // State
    selectedRows,
    isAllSelected,
    
    // Methods
    selectRow,
    selectAll,
    toggleRowSelection, // For backwards compatibility
    clearSelection,
    removeFromSelection,
    isRowSelected,
    getSelectedItems,
    
    // Computed values
    selectedCount: selectedRows.length,
    hasSelection: selectedRows.length > 0,
  };
};

export default useSelection;
