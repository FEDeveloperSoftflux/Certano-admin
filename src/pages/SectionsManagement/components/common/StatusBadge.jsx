import React from 'react';

/**
 * Status badge component for displaying section status
 * @param {Object} props - Component props
 * @param {string} props.status - Status value (active, inactive, draft)
 * @returns {JSX.Element} StatusBadge component
 */
const StatusBadge = ({ status }) => {
  let colorClasses;
  let label;
  
  switch (status?.toLowerCase()) {
    case 'active':
      colorClasses = 'bg-green-900/30 text-green-400 border-green-500/30';
      label = 'Active';
      break;
    case 'inactive':
      colorClasses = 'bg-red-900/30 text-red-400 border-red-500/30';
      label = 'Inactive';
      break;
    case 'draft':
      colorClasses = 'bg-orange-900/30 text-orange-400 border-orange-500/30';
      label = 'Draft';
      break;
    default:
      colorClasses = 'bg-gray-900/30 text-gray-400 border-gray-500/30';
      label = status || 'Unknown';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
