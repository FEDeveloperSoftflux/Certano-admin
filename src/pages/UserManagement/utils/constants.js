/**
 * Constants and mock data for UserManagement
 * Contains filter options, status configurations, and mock users
 */

// Filter options
export const FILTER_OPTIONS = [
  { value: 'status', label: 'Status' },
  { value: 'plan', label: 'Plan Type' },
  { value: 'support', label: 'Support Status' },
  { value: 'days', label: 'Subscription Days' }
];

// Status configurations
export const STATUS_CONFIGS = {
  status: {
    Active: { bgColor: 'bg-green-900/30', textColor: 'text-green-500' },
    Expired: { bgColor: 'bg-red-900/30', textColor: 'text-red-500' },
    Pending: { bgColor: 'bg-yellow-900/30', textColor: 'text-yellow-500' },
    Suspended: { bgColor: 'bg-orange-900/30', textColor: 'text-orange-500' }
  },
  plan: {
    Trial: { bgColor: 'bg-emerald-900/30', textColor: 'text-emerald-500' },
    Active: { bgColor: 'bg-green-900/30', textColor: 'text-green-500' },
    Premium: { bgColor: 'bg-purple-900/30', textColor: 'text-purple-500' },
    Basic: { bgColor: 'bg-blue-900/30', textColor: 'text-blue-500' }
  },
  support: {
    Pending: { bgColor: 'bg-gray-900/30', textColor: 'text-gray-500' },
    'No Issues': { bgColor: 'bg-purple-900/30', textColor: 'text-purple-500' },
    'Open Ticket': { bgColor: 'bg-orange-900/30', textColor: 'text-orange-500' }
  }
};

// Modal types
export const MODAL_TYPES = {
  PASSWORD_CHANGE: 'passwordChange',
  PASSWORD_RESET: 'passwordReset',
  BLOCK_USER: 'blockUser',
  DELETE_USER: 'deleteUser',
  ADD_USER: 'addUser'
};

// Mock data for development
export const mockUsers = [
  {
    id: "001",
    name: "Mike Johnson",
    email: "mike@example.com",
    plan: "Trial",
    days: "7 Days",
    supportStatus: "Pending",
    status: "Expired",
  },
  {
    id: "002",
    name: "Sarah Williams",
    email: "sarah@example.com",
    plan: "Active",
    days: "365 Days",
    supportStatus: "No Issues",
    status: "Active",
  },
  {
    id: "003",
    name: "Alex Thompson",
    email: "alex@example.com",
    plan: "Active",
    days: "30 Days",
    supportStatus: "Open Ticket",
    status: "Active",
  },
  {
    id: "004",
    name: "Jessica Miller",
    email: "jessica@example.com",
    plan: "Trial",
    days: "7 Days",
    supportStatus: "Pending",
    status: "Expired",
  },
  {
    id: "005",
    name: "David Wilson",
    email: "david@example.com",
    plan: "Active",
    days: "365 Days",
    supportStatus: "No Issues",
    status: "Active",
  },
  {
    id: "006",
    name: "Emily Taylor",
    email: "emily@example.com",
    plan: "Premium",
    days: "30 Days",
    supportStatus: "Open Ticket",
    status: "Active",
  },
];

// Table column definitions
export const TABLE_COLUMNS = [
  { id: 'checkbox', label: '', sortable: false },
  { id: 'id', label: 'ID', sortable: true },
  { id: 'name', label: 'User Name / Email', sortable: true },
  { id: 'plan', label: 'Plan', sortable: true },
  { id: 'days', label: 'Subscription Days', sortable: true },
  { id: 'supportStatus', label: 'Support Status', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'actions', label: 'Actions', sortable: false },
];
