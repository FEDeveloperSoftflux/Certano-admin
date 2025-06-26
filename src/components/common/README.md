# Common Components

This directory contains shared components and hooks that are used across multiple modules in the application.

## Components

### StatusBadge
A unified status badge component that supports multiple types:
- `status` - User status badges (Active, Expired, Pending, Suspended)
- `plan` - Plan badges (Trial, Active, Premium, Basic)
- `support` - Support status badges (Pending, No Issues, Open Ticket)
- `section` - Section status badges (Active, Inactive, Draft)

**Usage:**
```jsx
import { StatusBadge } from '@/components/common';

// User status
<StatusBadge type="status" value="Active" />

// Section status with border
<StatusBadge type="section" value="Draft" withBorder={true} />

// Plan badge
<StatusBadge type="plan" value="Premium" />
```

### LoadingOverlay
A loading overlay component with customizable spinner and backdrop.

**Usage:**
```jsx
import { LoadingOverlay, LoadingSpinner } from '@/components/common';

// Full overlay
<LoadingOverlay message="Loading..." opacity={20} />

// Standalone spinner
<LoadingSpinner size="lg" color="purple-500" />
```

## Hooks

### useSelection
A generic hook for managing table row selection that works with any data array.

**Usage:**
```jsx
import { useSelection } from '@/components/common';

const MyComponent = () => {
  const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  const {
    selectedRows,
    isAllSelected,
    selectRow,
    selectAll,
    clearSelection,
    getSelectedItems,
    selectedCount,
    hasSelection
  } = useSelection(data);

  // Use the selection state and methods...
};
```

## Migration Notes

The following components have been moved from module-specific locations to this shared directory:

### From userManagement:
- `StatusBadge` → `@/components/common/StatusBadge`
- `LoadingOverlay` → `@/components/common/LoadingOverlay`
- `useSelection` → `@/components/common/hooks/useSelection`

### From sectionsManagement:
- `StatusBadge` → `@/components/common/StatusBadge` (merged functionality)
- `LoadingOverlay` → `@/components/common/LoadingOverlay`
- `useSelection` → `@/components/common/hooks/useSelection` (unified implementation)

## Benefits

1. **Reduced Duplication**: Eliminates duplicate code across modules
2. **Consistency**: Ensures consistent UI/UX across the application
3. **Maintainability**: Single source of truth for common functionality
4. **Reusability**: Easy to use in new modules without copying code
5. **Performance**: Better tree-shaking and bundle optimization
