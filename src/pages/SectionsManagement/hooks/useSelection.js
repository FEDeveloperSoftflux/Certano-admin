import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing row selection in sections table
 * @param {Array} sections - Array of section objects
 * @returns {Object} Selection state and handlers
 */
const useSelection = (sections = []) => {
  const [selectedRows, setSelectedRows] = useState([]);

  /**
   * Toggles selection of a single row
   * @param {string|number} id - Row ID to toggle
   */
  const selectRow = useCallback((id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  /**
   * Toggles selection of all rows
   */
  const selectAll = useCallback(() => {
    if (sections.length === 0) return;
    
    if (selectedRows.length === sections.length) {
      // If all rows are selected, deselect all
      setSelectedRows([]);
    } else {
      // Otherwise, select all rows
      setSelectedRows(sections.map(section => section.id));
    }
  }, [sections, selectedRows.length]);

  /**
   * Clears all selected rows
   */
  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  // Clear selection when sections data changes
  useEffect(() => {
    clearSelection();
  }, [sections, clearSelection]);

  return {
    selectedRows,
    selectRow,
    selectAll,
    clearSelection,
  };
};

export default useSelection;
