import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generic status badge component that can be used for various status types
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Badge type (status, plan, support)
 * @param {string} props.value - Badge value to display
 * @param {string} [props.className] - Optional additional classes
 * @returns {JSX.Element} Status badge component
 */
const StatusBadge = ({ type, value, className = '' }) => {
  // Early validation to prevent runtime errors
  if (!type || !value) {
    console.error('StatusBadge requires type and value props');
    return null;
  }

  try {
    // Get badge configuration based on type and value
    const badgeConfig = getBadgeConfig(type, value);
    
    return (
      <span 
        className={`px-3 py-1 rounded-full text-xs ${badgeConfig.bgColor} ${badgeConfig.textColor} ${className}`}
      >
        {value}
      </span>
    );
  } catch (error) {
    console.error('Error rendering StatusBadge:', error);
    return <span className="text-gray-400">{value || 'Unknown'}</span>;
  }
};

/**
 * Get badge configuration based on type and value
 * 
 * @param {string} type - Badge type
 * @param {string} value - Badge value
 * @returns {Object} Badge configuration with colors
 */
const getBadgeConfig = (type, value) => {
  switch (type) {
    case 'status':
      return getStatusBadgeConfig(value);
    case 'plan':
      return getPlanBadgeConfig(value);
    case 'support':
      return getSupportBadgeConfig(value);
    default:
      return { bgColor: 'bg-gray-900/30', textColor: 'text-gray-500' };
  }
};

/**
 * Get configuration for status badges
 * 
 * @param {string} status - Status value
 * @returns {Object} Badge configuration
 */
const getStatusBadgeConfig = (status) => {
  switch (status) {
    case 'Active':
      return { bgColor: 'bg-green-900/30', textColor: 'text-green-500' };
    case 'Expired':
      return { bgColor: 'bg-red-900/30', textColor: 'text-red-500' };
    case 'Pending':
      return { bgColor: 'bg-yellow-900/30', textColor: 'text-yellow-500' };
    case 'Suspended':
      return { bgColor: 'bg-orange-900/30', textColor: 'text-orange-500' };
    default:
      return { bgColor: 'bg-gray-900/30', textColor: 'text-gray-500' };
  }
};

/**
 * Get configuration for plan badges
 * 
 * @param {string} plan - Plan value
 * @returns {Object} Badge configuration
 */
const getPlanBadgeConfig = (plan) => {
  switch (plan) {
    case 'Trial':
      return { bgColor: 'bg-emerald-900/30', textColor: 'text-emerald-500' };
    case 'Active':
      return { bgColor: 'bg-green-900/30', textColor: 'text-green-500' };
    case 'Premium':
      return { bgColor: 'bg-purple-900/30', textColor: 'text-purple-500' };
    case 'Basic':
      return { bgColor: 'bg-blue-900/30', textColor: 'text-blue-500' };
    default:
      return { bgColor: 'bg-gray-900/30', textColor: 'text-gray-500' };
  }
};

/**
 * Get configuration for support status badges
 * 
 * @param {string} support - Support status value
 * @returns {Object} Badge configuration
 */
const getSupportBadgeConfig = (support) => {
  switch (support) {
    case 'Pending':
      return { bgColor: 'bg-gray-900/30', textColor: 'text-gray-500' };
    case 'No Issues':
      return { bgColor: 'bg-purple-900/30', textColor: 'text-purple-500' };
    case 'Open Ticket':
      return { bgColor: 'bg-orange-900/30', textColor: 'text-orange-500' };
    default:
      return { bgColor: 'bg-gray-900/30', textColor: 'text-gray-500' };
  }
};

StatusBadge.propTypes = {
  type: PropTypes.oneOf(['status', 'plan', 'support']).isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default StatusBadge;

/**
 * Component for displaying support status with icon
 * 
 * @param {Object} props - Component props
 * @param {string} props.status - Support status value
 * @returns {JSX.Element} Support status with icon
 */
export const SupportStatusWithIcon = ({ status }) => {
  if (!status) return null;
  
  try {
    const config = getSupportBadgeConfig(status);
    
    return (
      <div className="flex items-center">
        <div className={`h-2 w-2 rounded-full mr-2 ${config.textColor.replace('text', 'bg')}`}></div>
        <span className={config.textColor}>{status}</span>
      </div>
    );
  } catch (error) {
    console.error('Error rendering SupportStatusWithIcon:', error);
    return <span className="text-gray-400">{status}</span>;
  }
};

SupportStatusWithIcon.propTypes = {
  status: PropTypes.string.isRequired,
};
