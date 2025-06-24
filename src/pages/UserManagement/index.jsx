/**
 * UserManagement module exports
 * Central export file for all components, hooks, and utilities
 */

// Export common components
export * from './components/common';

// Export main components
export { default as UserTable } from './components/UserTable';
export { default as TableActions } from './components/TableActions';
export { default as Pagination } from './components/Pagination';
export { default as PageHeader } from './components/PageHeader';

// Export hooks
export { default as useUserManagement } from './hooks/useUserManagement';
export { default as useModals } from './hooks/useModals';
export { default as useSelection } from './hooks/useSelection';
export { default as useFilter } from './hooks/useFilter';

// Export utilities
export * from './utils/constants';
export * from './utils/helpers';

// Default export of the main component
export { default } from './UserManagement';
