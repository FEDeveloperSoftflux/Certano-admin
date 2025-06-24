import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import StatusBadge from '../common/StatusBadge';
import useSectionsManagement from '../../hooks/useSectionsManagement';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import ViewIcon from '@/assets/icons/eye.svg';

/**
 * SectionsTable component for displaying sections data in a table format
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isProcessing - If true, user interactions are disabled
 * @param {boolean} props.isLoading - If true, table shows a loading state
 * @param {Function} props.openModal - Function to open modal dialogs
 * @returns {JSX.Element} SectionsTable component
 */
const SectionsTable = ({ isProcessing, isLoading, openModal }) => {
  // Get sections data and state from context
  const {
    sections,
    selectedRows,
    selectAll,
    toggleSelectAll,
    toggleRowSelection,
    filterSections,
    searchTerm,
  } = useSectionsManagement();

  // Memoize filtered sections for performance
  const filteredSections = useMemo(() => {
    return filterSections(sections);
  }, [sections, filterSections, searchTerm]);

  // Error boundary wrapper
  const SafeRender = ({ children, fallback = null }) => {
    try {
      return children;
    } catch (error) {
      console.error('Render error:', error);
      return fallback || <div className="text-red-500 p-2">Something went wrong</div>;
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full">
        <TableHeader 
          selectAll={selectAll}
          toggleSelectAll={toggleSelectAll}
          isProcessing={isProcessing}
          hasSections={Array.isArray(sections) && sections.length > 0}
          selectedCount={selectedRows.length}
        />
        
        <tbody>
          {!Array.isArray(filteredSections) || filteredSections.length === 0 ? (
            <EmptyTableState isLoading={isLoading} searchTerm={searchTerm} />
          ) : (
            filteredSections.map((section, index) => (
              <SafeRender key={`section-${index}`} fallback={<ErrorRow index={index} />}>
                <TableRow 
                  section={section}
                  index={index}
                  isSelected={selectedRows.includes(index)}
                  toggleSelection={toggleRowSelection}
                  isProcessing={isProcessing}
                  openModal={openModal}
                />
              </SafeRender>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Table header component with column titles and select all checkbox
 */
const TableHeader = ({ selectAll, toggleSelectAll, isProcessing, hasSections, selectedCount }) => (
  <thead>
    <tr className="border-b border-[#333] bg-[#222]">
      <th className="px-4 py-3 text-left">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
            className="w-4 h-4 accent-[#9d3fff] bg-[#222] border border-[#444] rounded cursor-pointer"
            disabled={isProcessing || !hasSections}
          />
          <span className="ml-3 text-sm text-gray-400">
            {selectedCount > 0 ? `Selected (${selectedCount})` : 'Select All'}
          </span>
        </div>
      </th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">ID</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Title</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Description</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Scraper Link</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Template</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Reform Sensitive</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Status</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Actions</th>
    </tr>
  </thead>
);

/**
 * Table row component for displaying section data
 */
const TableRow = ({ section, index, isSelected, toggleSelection, isProcessing, openModal }) => (
  <tr
    key={index}
    className={`border-b border-[#333] transition-colors ${isSelected ? 'bg-[#191919]/70' : 'hover:bg-[#191919]'}`}
  >
    <td className="px-4 py-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelection(index)}
        className="w-4 h-4 accent-[#9d3fff] bg-[#222] border border-[#444] rounded cursor-pointer"
        disabled={isProcessing}
      />
    </td>
    <td className="px-4 py-4 text-white">{section.id}</td>
    <td className="px-4 py-4 text-white">{section.title}</td>
    <td className="px-4 py-4 text-white text-sm">
      {section.description.length > 50 
        ? `${section.description.substring(0, 50)}...` 
        : section.description}
    </td>
    <td className="px-4 py-4">
      <a 
        href={section.scraperLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[#9d3fff] hover:text-[#b96fff] text-sm"
      >
        {section.scraperLink.length > 30 
          ? `${section.scraperLink.substring(0, 30)}...` 
          : section.scraperLink}
      </a>
    </td>
    <td className="px-4 py-4 text-white">{section.template}</td>
    <td className="px-4 py-4">
      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${section.reformSensitive ? 'bg-green-600' : 'bg-red-600'}`}>
        {section.reformSensitive ? '✓' : '✗'}
      </span>
    </td>
    <td className="px-4 py-4">
      <StatusBadge type="status" value={section.status} />
    </td>
    <td className="px-4 py-4">
      <div className="flex space-x-2">
        <ActionButton
          icon={ViewIcon}
          title="View Section"
          onClick={() => openModal("viewSection", section)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={EditIcon}
          title="Edit Section"
          onClick={() => openModal("editSection", section)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={DeleteIcon}
          title="Delete Section"
          onClick={() => openModal("deleteSection", section)}
          disabled={isProcessing}
        />
      </div>
    </td>
  </tr>
);

/**
 * Action button component for row actions
 */
const ActionButton = ({ icon, title, onClick, disabled }) => (
  <button
    onClick={onClick}
    className="p-1.5 rounded-full bg-[#333] hover:bg-[#444] transition-transform transform hover:scale-110 shadow-md disabled:opacity-50 disabled:pointer-events-none"
    title={title}
    disabled={disabled}
  >
    <img src={icon} alt={title} className="h-4 w-4" />
  </button>
);

/**
 * Empty state component shown when there are no sections
 */
const EmptyTableState = ({ isLoading, searchTerm }) => (
  <tr>
    <td colSpan="9" className="px-4 py-8 text-center">
      {isLoading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 border-2 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400">Loading sections...</span>
        </div>
      ) : searchTerm ? (
        <div className="text-gray-400">
          No sections found matching "{searchTerm}"
        </div>
      ) : (
        <div className="text-gray-400">
          No sections available. Add sections using the "Add Section" button.
        </div>
      )}
    </td>
  </tr>
);

/**
 * Error row component shown when a row fails to render
 */
const ErrorRow = ({ index }) => (
  <tr className="border-b border-[#333] bg-red-900/10">
    <td colSpan="9" className="px-4 py-4 text-red-400">
      Error rendering section at index {index}. Please check the console for details.
    </td>
  </tr>
);

SectionsTable.propTypes = {
  isProcessing: PropTypes.bool,
  isLoading: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
};

SectionsTable.defaultProps = {
  isProcessing: false,
  isLoading: false,
};

TableHeader.propTypes = {
  selectAll: PropTypes.bool.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  hasSections: PropTypes.bool.isRequired,
  selectedCount: PropTypes.number.isRequired,
};

TableRow.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    scraperLink: PropTypes.string.isRequired,
    template: PropTypes.string.isRequired,
    reformSensitive: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

EmptyTableState.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string,
};

ErrorRow.propTypes = {
  index: PropTypes.number.isRequired,
};

export default SectionsTable;
