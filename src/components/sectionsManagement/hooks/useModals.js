import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing modals in the sections management page
 * @returns {Object} Modal state and handlers
 */
const useModals = () => {
  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Success message states
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);
  
  // Unsaved changes state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  
  // Refs for tracking timeouts to clean them up
  const successTimeoutRef = useRef(null);
  const modalTimeoutRef = useRef(null);

  /**
   * Opens a modal with the specified type and section
   * @param {string} modalType - Type of modal to open
   * @param {Object|null} section - Section data to pass to the modal
   */
  const openModal = useCallback((modalType, section = null) => {
    if (isProcessing) {
      console.log('Cannot open modal while processing');
      return;
    }
    
    // Validate modal type
    const validModalTypes = ['addSection', 'editSection', 'deleteSection', 'confirmDialog', 'aiPreview'];
    if (!validModalTypes.includes(modalType)) {
      console.error(`Invalid modal type: ${modalType}`);
      return;
    }
    
    // Validate section object if provided
    if (section !== null && typeof section !== 'object') {
      console.error('Invalid section object provided to modal');
      return;
    }
    
    // Check for unsaved changes before opening new modal
    if (hasUnsavedChanges && activeModal && modalType !== 'confirmDialog') {
      setPendingAction(() => () => {
        _openModal(modalType, section);
      });
      setIsConfirmDialogOpen(true);
      return;
    }
    
    _openModal(modalType, section);
  }, [activeModal, isProcessing, hasUnsavedChanges]);
  
  /**
   * Internal function to open a modal
   * @private
   */
  const _openModal = useCallback((modalType, section) => {
    // Clear any existing modal timeouts
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
    
    // First close any open modal to prevent multiple modals
    if (activeModal && activeModal !== 'confirmDialog') {
      setActiveModal(null);
      
      // Short timeout to allow modal closing animation before opening a new one
      modalTimeoutRef.current = setTimeout(() => {
        setActiveModal(modalType);
        setCurrentSection(section);
        modalTimeoutRef.current = null;
      }, 300);
    } else {
      // No modal is open, open directly
      setActiveModal(modalType);
      setCurrentSection(section);
    }
  }, [activeModal]);

  /**
   * Confirms the pending action after unsaved changes dialog
   */
  const confirmPendingAction = useCallback(() => {
    setIsConfirmDialogOpen(false);
    
    if (pendingAction) {
      // Execute the pending action
      pendingAction();
      setPendingAction(null);
      setHasUnsavedChanges(false);
    }
  }, [pendingAction]);
  
  /**
   * Cancels the pending action
   */
  const cancelPendingAction = useCallback(() => {
    setIsConfirmDialogOpen(false);
    setPendingAction(null);
  }, []);

  /**
   * Closes all open modals
   */
  const closeAllModals = useCallback(() => {
    // Check for unsaved changes before closing
    if (hasUnsavedChanges && activeModal !== 'confirmDialog') {
      setPendingAction(() => () => {
        _closeAllModals();
      });
      setIsConfirmDialogOpen(true);
      return;
    }
    
    _closeAllModals();
  }, [hasUnsavedChanges, activeModal]);
  
  /**
   * Internal function to close all modals
   * @private
   */
  const _closeAllModals = useCallback(() => {
    // Clear any existing modal timeouts
    if (modalTimeoutRef.current) {
      clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
    
    setActiveModal(null);
    setHasUnsavedChanges(false);
    
    // Give a slight delay before clearing current section to avoid UI jumps
    modalTimeoutRef.current = setTimeout(() => {
      setCurrentSection(null);
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
    setHasUnsavedChanges(false);
    
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
    const isAnyModalOpen = activeModal !== null || isSuccessMessageOpen || isConfirmDialogOpen;
    
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
  }, [activeModal, isSuccessMessageOpen, isConfirmDialogOpen]);

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
    currentSection,
    isProcessing,
    
    // Success message states
    successMessage,
    isSuccessMessageOpen,
    setIsSuccessMessageOpen,
    
    // Unsaved changes states
    hasUnsavedChanges,
    setHasUnsavedChanges,
    isConfirmDialogOpen,
    
    // Modal handlers
    openModal,
    closeAllModals,
    showSuccessMessage,
    confirmPendingAction,
    cancelPendingAction,
  };
};

export default useModals;
