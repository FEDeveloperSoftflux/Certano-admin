/**
 * Helper functions for user management operations
 */
import { STATUS_CONFIGS } from './constants';

/**
 * Get configuration for a status badge based on type and value
 * 
 * @param {string} type - Type of status (status, plan, support)
 * @param {string} value - Status value
 * @returns {Object} Configuration with background and text colors
 */
export const getStatusConfig = (type, value) => {
  if (!STATUS_CONFIGS[type] || !STATUS_CONFIGS[type][value]) {
    return { bgColor: 'bg-gray-900/30', textColor: 'text-gray-500' };
  }
  return STATUS_CONFIGS[type][value];
};

/**
 * Validate if a user object is valid
 * 
 * @param {Object} user - User object to validate
 * @returns {boolean} True if user is valid
 */
export const isValidUser = (user) => {
  return user && 
    typeof user === 'object' && 
    user.id && 
    (typeof user.id === 'string' || typeof user.id === 'number');
};

/**
 * Get initials from user name
 * 
 * @param {string} name - User name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Safe handler to prevent errors when calling functions
 * 
 * @param {Function} handler - Function to call
 * @param {Array} args - Arguments to pass to function
 * @returns {*} Result of function or undefined if error
 */
export const safeHandler = (handler, ...args) => {
  if (typeof handler !== 'function') {
    console.error('Invalid handler provided');
    return;
  }
  try {
    return handler(...args);
  } catch (error) {
    console.error('Error in handler:', error);
    return undefined;
  }
};
