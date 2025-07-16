import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StatusBadge, SupportStatusWithIcon } from '@/components/common';
import { useResponsive } from '@/hooks/useResponsive';
import useUserManagement from '../../hooks/useUserManagement';
import PasswordIcon from '@/assets/icons/password.svg';
import RevertIcon from '@/assets/icons/revert.svg';
import BlockIcon from '@/assets/icons/block.svg';
import DeleteIcon from '@/assets/icons/delete.svg';

/**
 * UserTable component for displaying user data in a table format
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isProcessing - If true, user interactions are disabled
 * @param {boolean} props.isLoading - If true, table shows a loading state
 * @param {Function} props.openModal - Function to open modal dialogs
 * @returns {JSX.Element} UserTable component
 */
const UserTable = ({ isProcessing, isLoading, openModal }) => {
  const { isMobile } = useResponsive();
  
  // Get user data and state from context
  const {
    users,
    selectedRows,
    isAllSelected,
    selectAll,
    toggleRowSelection,
    filterUsers,
    searchTerm,
  } = useUserManagement();

  // Memoize filtered users for performance
  const filteredUsers = useMemo(() => {
    return filterUsers(users);
  }, [users, filterUsers, searchTerm]);

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
    <div className="rounded-xl">
      {isMobile ? (
        <div className="space-y-3">
          {!Array.isArray(filteredUsers) || filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {isLoading ? 'Loading users...' : 
               searchTerm ? `No users found matching "${searchTerm}"` : 
               'No users available. Add users using the "Add User" button.'}
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <SafeRender key={`user-${index}`} fallback={<div className="text-red-400 p-4 bg-red-900/10 rounded-lg">Error loading user</div>}>
                <MobileUserCard 
                  user={user}
                  index={index}
                  isSelected={selectedRows.includes(user.id)}
                  toggleSelection={() => toggleRowSelection(index)}
                  isProcessing={isProcessing}
                  openModal={openModal}
                />
              </SafeRender>
            ))
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <TableHeader 
              isAllSelected={isAllSelected}
              toggleSelectAll={selectAll}
              isProcessing={isProcessing}
              hasUsers={Array.isArray(users) && users.length > 0}
              selectedCount={selectedRows.length}
            />
            
            <tbody>
              {!Array.isArray(filteredUsers) || filteredUsers.length === 0 ? (
                <EmptyTableState isLoading={isLoading} searchTerm={searchTerm} />
              ) : (
                filteredUsers.map((user, index) => (
                  <SafeRender key={`user-${index}`} fallback={<ErrorRow index={index} />}>
                    <TableRow 
                      user={user}
                      index={index}
                      isSelected={selectedRows.includes(user.id)}
                      toggleSelection={() => toggleRowSelection(index)}
                      isProcessing={isProcessing}
                      openModal={openModal}
                    />
                  </SafeRender>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/**
 * Mobile user card component for displaying user data on mobile devices
 */
const MobileUserCard = ({ user, index, isSelected, toggleSelection, isProcessing, openModal }) => (
  <div className={`p-4 rounded-lg border transition-all ${
    isSelected ? 'bg-[#191919]/70 border-[#9d3fff]' : 'bg-[#222] border-[#333] hover:bg-[#191919]'
  }`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelection}
          className="w-4 h-4 accent-[#9d3fff] bg-[#222] border border-[#444] rounded cursor-pointer"
          disabled={isProcessing}
        />
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9d3fff] to-[#ffd93f] flex items-center justify-center text-white text-sm font-bold shadow-md">
          {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
        </div>
        <div>
          <div className="text-white font-medium">{user.name}</div>
          <div className="text-gray-400 text-sm">{user.email}</div>
        </div>
      </div>
      <div className="text-xs text-gray-400">#{user.id}</div>
    </div>
    
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <div className="text-xs text-gray-400 mb-1">Plan</div>
        <StatusBadge type="plan" value={user.plan} />
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Status</div>
        <StatusBadge type="status" value={user.status} />
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Days</div>
        <div className="text-white text-sm">{user.days}</div>
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Support</div>
        <SupportStatusWithIcon status={user.supportStatus} />
      </div>
    </div>
    
    <div className="flex justify-between items-center pt-3 border-t border-[#333]">
      <span className="text-xs text-gray-400">Actions</span>
      <div className="flex space-x-2">
        <ActionButton
          icon={PasswordIcon}
          title="Change Password"
          onClick={() => openModal("passwordChange", user)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={RevertIcon}
          title="Reset Password"
          onClick={() => openModal("passwordReset", user)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={BlockIcon}
          title="Block User"
          onClick={() => openModal("blockUser", user)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={DeleteIcon}
          title="Delete User"
          onClick={() => openModal("deleteUser", user)}
          disabled={isProcessing}
        />
      </div>
    </div>
  </div>
);

/**
 * Table header component with column titles and select all checkbox
 */
const TableHeader = ({ isAllSelected, toggleSelectAll, isProcessing, hasUsers, selectedCount }) => (
  <thead>
    <tr className="border-b border-[#333] bg-[#222]">
      <th className="px-4 py-3 text-left">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleSelectAll}
            className="w-4 h-4 accent-[#9d3fff] bg-[#222] border border-[#444] rounded cursor-pointer"
            disabled={isProcessing || !hasUsers}
          />
          <span className="ml-3 text-sm text-gray-400">
            {selectedCount > 0 ? `Selected (${selectedCount})` : 'Select All'}
          </span>
        </div>
      </th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">ID</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">User Name / Email</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Plan</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Subscription Days</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Support Status</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Status</th>
      <th className="px-4 py-3 text-left text-sm text-gray-400">Actions</th>
    </tr>
  </thead>
);

/**
 * Table row component for displaying user data
 */
const TableRow = ({ user, index, isSelected, toggleSelection, isProcessing, openModal }) => (
  <tr
    key={index}
    className={`border-b border-[#333] transition-colors ${isSelected ? 'bg-[#191919]/70' : 'hover:bg-[#191919]'}`}
  >
    <td className="px-4 py-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelection()}
        className="w-4 h-4 accent-[#9d3fff] bg-[#222] border border-[#444] rounded cursor-pointer"
        disabled={isProcessing}
      />
    </td>
    <td className="px-4 py-4 text-white">{user.id}</td>
    <td className="px-4 py-4">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9d3fff] to-[#ffd93f] flex items-center justify-center text-white text-xs mr-3 shadow-md">
          {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
        </div>
        <div>
          <div className="text-white">{user.name}</div>
          <div className="text-gray-400 text-sm">{user.email}</div>
        </div>
      </div>
    </td>
    <td className="px-4 py-4">
      <StatusBadge type="plan" value={user.plan} />
    </td>
    <td className="px-4 py-4 text-white">{user.days}</td>
    <td className="px-4 py-4">
      <SupportStatusWithIcon status={user.supportStatus} />
    </td>
    <td className="px-4 py-4">
      <StatusBadge type="status" value={user.status} />
    </td>
    <td className="px-4 py-4">
      <div className="flex space-x-2">
        <ActionButton
          icon={PasswordIcon}
          title="Change Password"
          onClick={() => openModal("passwordChange", user)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={RevertIcon}
          title="Reset Password"
          onClick={() => openModal("passwordReset", user)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={BlockIcon}
          title="Block User"
          onClick={() => openModal("blockUser", user)}
          disabled={isProcessing}
        />
        <ActionButton
          icon={DeleteIcon}
          title="Delete User"
          onClick={() => openModal("deleteUser", user)}
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
 * Empty state component shown when there are no users
 */
const EmptyTableState = ({ isLoading, searchTerm }) => (
  <tr>
    <td colSpan="8" className="px-4 py-8 text-center">
      {isLoading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 border-2 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400">Loading users...</span>
        </div>
      ) : searchTerm ? (
        <div className="text-gray-400">
          No users found matching "{searchTerm}"
        </div>
      ) : (
        <div className="text-gray-400">
          No users available. Add users using the "Add User" button.
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
    <td colSpan="8" className="px-4 py-4 text-red-400">
      Error rendering user at index {index}. Please check the console for details.
    </td>
  </tr>
);

UserTable.propTypes = {
  isProcessing: PropTypes.bool,
  isLoading: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
};

UserTable.defaultProps = {
  isProcessing: false,
  isLoading: false,
};

TableHeader.propTypes = {
  isAllSelected: PropTypes.bool.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  hasUsers: PropTypes.bool.isRequired,
  selectedCount: PropTypes.number.isRequired,
};

TableRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    plan: PropTypes.string.isRequired,
    days: PropTypes.string.isRequired,
    supportStatus: PropTypes.string.isRequired,
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

export default UserTable;
