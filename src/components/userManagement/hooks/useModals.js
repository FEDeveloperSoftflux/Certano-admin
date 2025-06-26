import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing modals in the user management page
 * @returns {Object} Modal state and handlers
 */
const useModals = () => {
  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Success message states
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);
  
  // Refs for tracking timeouts to clean them up
  const successTimeoutRef = useRef(null);
  const modalTimeoutRef = useRef(null);

  /**
   * Opens a modal with the specified type and user
   * @param {string} modalType - Type of modal to open
   * @param {Object|null} user - User data to pass to the modal
   */
  const openModal = useCallback((modalType, user = null) => {
    if (isProcessing) {
      console.log('Cannot open modal while processing');
      return;
    }
    
    // Validate modal type
    const validModalTypes = ['passwordChange', 'passwordReset', 'blockUser', 'deleteUser', 'addUser'];
    if (!validModalTypes.includes(modalType)) {
      console.error(`Invalid modal type: ${modalType}`);
      return;
    }
    
    // Validate user object if provided
    if (user !== null && typeof user !== 'object') {
      console.error('Invalid user object provided to modal');
      return;
    }
    
    // Clear any existing modal timeouts
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
    
    // First close any open modal to prevent multiple modals
    if (activeModal) {
      setActiveModal(null);
      
      // Short timeout to allow modal closing animation before opening a new one
      modalTimeoutRef.current = setTimeout(() => {
        setActiveModal(modalType);
        setCurrentUser(user);
        modalTimeoutRef.current = null;
      }, 300);
    } else {
      // No modal is open, open directly
      setActiveModal(modalType);
      setCurrentUser(user);
    }
  }, [activeModal, isProcessing]);

  /**
   * Closes all open modals
   */
  const closeAllModals = useCallback(() => {
    // Clear any existing modal timeouts
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
    
    setActiveModal(null);
    
    // Give a slight delay before clearing current user to avoid UI jumps
    modalTimeoutRef.current = setTimeout(() => {
      setCurrentUser(null);
      modalTimeoutRef.current = null;
    }, 300);
  }, []);

  /**
   * Shows a success message and automatically hides it after a delay
   * @param {string} message - Message to display
   */
  const showSuccessMessage = useCallback((message) => {
    if (!message || typeof message !== 'string') {
      console.error('Invalid success message:', message);
      message = 'Operation completed successfully';
    }
    
    // Set processing state to prevent simultaneous actions
    setIsProcessing(true);
    
    // Clear any existing timeout to prevent race conditions
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
    
    // Close any open modals
    setActiveModal(null);
    
    // Short delay before showing success message
    successTimeoutRef.current = setTimeout(() => {
      setSuccessMessage(message);
      setIsSuccessMessageOpen(true);
      successTimeoutRef.current = null;
      
      // Auto close success message after 3 seconds
      successTimeoutRef.current = setTimeout(() => {
        setIsSuccessMessageOpen(false);
        successTimeoutRef.current = null;
        
        // Clear message after animation completes
        setTimeout(() => {
          setSuccessMessage("");
          setIsProcessing(false); // Reset processing state
        }, 300);
      }, 3000);
    }, 300);
  }, []);

  // Effect to handle body class when any modal is open
  useEffect(() => {
    const isAnyModalOpen = activeModal !== null || isSuccessMessageOpen;
    
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    }
    
    // Cleanup function to restore body state
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    };
  }, [activeModal, isSuccessMessageOpen]);

  // Cleanup all timeouts on hook unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
        modalTimeoutRef.current = null;
      }
    };
  }, []);

  return {
    // Modal states
    activeModal,
    currentUser,
    isProcessing,
    
    // Success message states
    successMessage,
    isSuccessMessageOpen,
    setIsSuccessMessageOpen,
    
    // Modal handlers
    openModal,
    closeAllModals,
    showSuccessMessage,
  };
};

export default useModals;
