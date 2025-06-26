import { useState, useCallback, useEffect } from 'react';
import { mockUsers } from '../utils/constants';
import useModals from './useModals';
import { useSelection } from '@/components/common';
import useFilter from './useFilter';

/**
 * Main hook for UserManagement page that combines other hooks
 * @returns {Object} All state and handlers for user management
 */
const useUserManagement = () => {
  // Get data and states from other hooks
  const { users, isLoading, setIsLoading } = useUsersData();
  const selection = useSelection(users);
  const filter = useFilter();
  const modal = useModals();

  // Set up password visibility state
  const [passwordVisibility, setPasswordVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // Toggle password visibility
  const togglePasswordVisibility = useCallback((field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  // Helper function to validate user object
  const isValidUser = useCallback((user) => {
    return user && 
           typeof user === 'object' && 
           user.id && 
           (typeof user.id === 'string' || typeof user.id === 'number');
  }, []);

  // Return combined state and handlers from all hooks
  return {
    // User data
    users,
    isLoading,
    setIsLoading,
    
    // Selection state
    ...selection,
    
    // Filter state
    ...filter,
    
    // Modal state
    ...modal,
    
    // Password visibility
    passwordVisibility,
    togglePasswordVisibility,
    
    // Utility functions
    isValidUser,
  };
};

/**
 * Hook to handle user data fetching and loading state
 * @returns {Object} User data and loading state
 */
const useUsersData = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, isLoading, setIsLoading };
};

export default useUserManagement;
