# Sections Management Module

## Overview
The Sections Management module provides an interface for administrators to create, view, edit, and delete sections within the application. This module was developed following a modular approach, separating concerns between UI components, state management hooks, and utility functions.

## Component Hierarchy
- **SectionsManagement**: Main container component
  - **PageHeader**: Title and main actions (Add Section button)
  - **SearchBar**: Filtering sections by search term
  - **FilterDropdown**: Filtering sections by status
  - **SectionsTable**: Displays the sections data
    - **TableHeader**: Column headers with sorting functionality
    - **TableRows**: Individual section entries
    - **TableActions**: Actions for each row (Edit, Delete)
  - **Pagination**: Navigation between pages of sections
  - **Modals**:
    - **AddSectionModal**: Form for creating new sections
      - **AI Preview**: Preview AI-generated content
    - **EditSectionModal**: Form for editing existing sections
    - **DeleteSectionModal**: Confirmation for section deletion
    - **ConfirmDialog**: Prompts user about unsaved changes

## Features
- **Section Management**: Complete CRUD operations for sections
- **Filtering**: Search by text and filter by status
- **Sorting**: Sort sections by different columns
- **Pagination**: Navigate through multiple pages of sections
- **AI Content Generation**: Preview AI-generated content for sections
- **Unsaved Changes Protection**: Confirmation dialog when navigating away with unsaved changes
- **Status Management**: Toggle section status (Active/Inactive)
- **Form Validation**: Input validation for required fields

## Usage
```jsx
import SectionsManagement from 'pages/SectionsManagement';

function AdminPage() {
  return (
    <div className="admin-container">
      <SectionsManagement />
    </div>
  );
}
```

## State Management Hooks
The module implements several custom hooks to manage different aspects of state:

### `useSectionsManagement`
Manages the primary state and operations for the sections list including:
- Loading sections data
- Adding, updating, and deleting sections
- Pagination state
- Success messages and their timeouts

### `useModals`
Controls the visibility of various modals in the sections management interface:
- Add Section modal
- Edit Section modal
- Delete Section modal
- Confirm Dialog for unsaved changes

### `useSelection`
Manages the selection state of sections in the table:
- Selected section(s)
- Setting and clearing selections

### `useFilter`
Handles filtering functionality:
- Search term filtering
- Status filtering (Active/Inactive)
- Filter dropdown visibility

### `useSort`
Manages sorting state:
- Current sort column
- Sort direction
- Changing sort criteria

## File Structure
```
SectionsManagement/
├── README.md
├── components/
│   ├── SectionsManagement.jsx
│   ├── SectionsTable.jsx
│   ├── AddSectionModal.jsx
│   ├── EditSectionModal.jsx
│   ├── DeleteSectionModal.jsx
│   └── ConfirmDialog.jsx
├── hooks/
│   ├── useSectionsManagement.js
│   ├── useModals.js
│   ├── useSelection.js
│   ├── useFilter.js
│   └── useSort.js
└── index.js
```

## Future Improvements
- Unit tests for components and hooks
- Performance optimization for large datasets
- Enhanced accessibility features
- Additional filtering options
- Bulk actions for multiple selections
