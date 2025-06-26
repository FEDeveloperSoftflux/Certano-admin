/**
 * SectionsManagement module exports
 * Central export file for all components, hooks, and utilities
 */

// Export common components
export * from './components/common';

// Export main components
export { default as SectionsTable } from './components/SectionsTable';
export { default as TableActions } from './components/TableActions';
export { default as Pagination } from './components/Pagination';
export { default as PageHeader } from './components/PageHeader';

// Export hooks
export { default as useSectionsManagement } from './hooks/useSectionsManagement';
export { default as useModals } from './hooks/useModals';
export { default as useFilter } from './hooks/useFilter';

// Default export of the main component
export { default } from './SectionsManagement';
