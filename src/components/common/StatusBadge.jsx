import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generic status badge component that can be used for various status types
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Badge type (status, plan, support, section)
 * @param {string} props.value - Badge value to display
 * @param {string} [props.className] - Optional additional classes
 * @param {boolean} [props.withBorder] - Whether to show border
 * @returns {JSX.Element} Status badge component
 */
const StatusBadge = ({ type = 'status', value, className = '', withBorder = false }) => {
  // Early validation to prevent runtime errors
  if (!value) {
    console.error('StatusBadge requires value prop');
    return null;
  }

  try {
    // Get badge configuration based on type and value
    const badgeConfig = getBadgeConfig(type, value);
    const borderClass = withBorder ? `border ${badgeConfig.borderColor || 'border-gray-500/30'}` : '';
    
    return (
      <span 
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeConfig.bgColor} ${badgeConfig.textColor} ${borderClass} ${className}`}
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
    case 'section':
      return getSectionBadgeConfig(value);
    default:
      return { bgColor: 'bg-gray-900/30', textColor: 'text-gray-400', borderColor: 'border-gray-500/30' };
  }
};

/**
 * Get configuration for user status badges
 * 
 * @param {string} status - Status value
 * @returns {Object} Badge configuration
 */
const getStatusBadgeConfig = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return { 
        bgColor: 'bg-green-900/30', 
        textColor: 'text-green-400', 
        borderColor: 'border-green-500/30' 
      };
    case 'expired':
      return { 
        bgColor: 'bg-red-900/30', 
        textColor: 'text-red-400', 
        borderColor: 'border-red-500/30' 
      };
    case 'pending':
      return { 
        bgColor: 'bg-yellow-900/30', 
        textColor: 'text-yellow-400', 
        borderColor: 'border-yellow-500/30' 
      };
    case 'suspended':
      return { 
        bgColor: 'bg-orange-900/30', 
        textColor: 'text-orange-400', 
        borderColor: 'border-orange-500/30' 
      };
    default:
      return { 
        bgColor: 'bg-gray-900/30', 
        textColor: 'text-gray-400', 
        borderColor: 'border-gray-500/30' 
      };
  }
};

/**
 * Get configuration for section status badges
 * 
 * @param {string} status - Status value
 * @returns {Object} Badge configuration
 */
const getSectionBadgeConfig = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return { 
        bgColor: 'bg-green-900/30', 
        textColor: 'text-green-400', 
        borderColor: 'border-green-500/30' 
      };
    case 'inactive':
      return { 
        bgColor: 'bg-red-900/30', 
        textColor: 'text-red-400', 
        borderColor: 'border-red-500/30' 
      };
    case 'draft':
      return { 
        bgColor: 'bg-orange-900/30', 
        textColor: 'text-orange-400', 
        borderColor: 'border-orange-500/30' 
      };
    default:
      return { 
        bgColor: 'bg-gray-900/30', 
        textColor: 'text-gray-400', 
        borderColor: 'border-gray-500/30' 
      };
  }
};

/**
 * Get configuration for plan badges
 * 
 * @param {string} plan - Plan value
 * @returns {Object} Badge configuration
 */
const getPlanBadgeConfig = (plan) => {
  switch (plan?.toLowerCase()) {
    case 'trial':
      return { 
        bgColor: 'bg-emerald-900/30', 
        textColor: 'text-emerald-400', 
        borderColor: 'border-emerald-500/30' 
      };
    case 'active':
      return { 
        bgColor: 'bg-green-900/30', 
        textColor: 'text-green-400', 
        borderColor: 'border-green-500/30' 
      };
    case 'premium':
      return { 
        bgColor: 'bg-purple-900/30', 
        textColor: 'text-purple-400', 
        borderColor: 'border-purple-500/30' 
      };
    case 'basic':
      return { 
        bgColor: 'bg-blue-900/30', 
        textColor: 'text-blue-400', 
        borderColor: 'border-blue-500/30' 
      };
    default:
      return { 
        bgColor: 'bg-gray-900/30', 
        textColor: 'text-gray-400', 
        borderColor: 'border-gray-500/30' 
      };
  }
};

/**
 * Get configuration for support status badges
 * 
 * @param {string} support - Support status value
 * @returns {Object} Badge configuration
 */
const getSupportBadgeConfig = (support) => {
  switch (support?.toLowerCase()) {
    case 'pending':
      return { 
        bgColor: 'bg-gray-900/30', 
        textColor: 'text-gray-400', 
        borderColor: 'border-gray-500/30' 
      };
    case 'no issues':
      return { 
        bgColor: 'bg-purple-900/30', 
        textColor: 'text-purple-400', 
        borderColor: 'border-purple-500/30' 
      };
    case 'open ticket':
      return { 
        bgColor: 'bg-orange-900/30', 
        textColor: 'text-orange-400', 
        borderColor: 'border-orange-500/30' 
      };
    default:
      return { 
        bgColor: 'bg-gray-900/30', 
        textColor: 'text-gray-400', 
        borderColor: 'border-gray-500/30' 
      };
  }
};

StatusBadge.propTypes = {
  type: PropTypes.oneOf(['status', 'plan', 'support', 'section']),
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  withBorder: PropTypes.bool,
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
