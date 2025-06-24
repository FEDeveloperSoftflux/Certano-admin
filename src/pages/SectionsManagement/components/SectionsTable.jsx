import React from 'react';
import { StatusBadge } from '../components/common';

/**
 * Table component for displaying sections
 * @param {Object} props - Component props
 * @param {Array} props.sections - Array of section objects
 * @param {Array} props.selectedRows - Array of selected row IDs
 * @param {Function} props.onSelectRow - Handler for row selection
 * @param {Function} props.onSelectAll - Handler for selecting all rows
 * @param {Function} props.openModal - Handler for opening modals
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.isProcessing - Processing state
 * @returns {JSX.Element} SectionsTable component
 */
const SectionsTable = ({ 
  sections = [],
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  openModal,
  isLoading = false,
  isProcessing = false
}) => {
  // Disabled state for interactive elements
  const isDisabled = isLoading || isProcessing;
  
  // All rows selected state
  const isAllSelected = sections.length > 0 && selectedRows.length === sections.length;
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-gray-400 uppercase bg-[#222]">
          <tr>
            <th className="px-4 py-3 w-[50px]">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="w-4 h-4 bg-[#222] border-gray-600 rounded focus:ring-[#9d3fff] focus:ring-2"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  disabled={isDisabled}
                />
                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
              </div>
            </th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 whitespace-nowrap">Created</th>
            <th className="px-4 py-3 whitespace-nowrap">Updated</th>
            <th className="px-4 py-3 w-[100px]">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sections.length === 0 ? (
            <tr className="bg-[#1a1a1a] border-b border-[#333]">
              <td colSpan="7" className="px-4 py-6 text-center text-gray-400">
                {isLoading ? 'Loading sections...' : 'No sections found'}
              </td>
            </tr>
          ) : (
            sections.map(section => (
              <tr 
                key={section.id} 
                className={`${
                  selectedRows.includes(section.id) ? 'bg-[#2a2a3d]' : 'bg-[#1a1a1a]'
                } border-b border-[#333] hover:bg-[#252538] transition-colors`}
              >
                <td className="px-4 py-4 w-[50px]">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 bg-[#222] border-gray-600 rounded focus:ring-[#9d3fff] focus:ring-2"
                      checked={selectedRows.includes(section.id)}
                      onChange={() => onSelectRow(section.id)}
                      disabled={isDisabled}
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium whitespace-nowrap">
                  {section.title}
                </td>
                <td className="px-4 py-4 max-w-[250px] truncate">
                  {section.description}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={section.status} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {formatDate(section.createdAt)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {formatDate(section.updatedAt)}
                </td>
                <td className="px-4 py-4 text-right space-x-2 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => openModal('editSection', section)}
                    disabled={isDisabled}
                    className="text-blue-400 hover:text-blue-300 disabled:text-gray-600 disabled:pointer-events-none"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal('deleteSection', section)}
                    disabled={isDisabled}
                    className="text-red-400 hover:text-red-300 disabled:text-gray-600 disabled:pointer-events-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SectionsTable;
