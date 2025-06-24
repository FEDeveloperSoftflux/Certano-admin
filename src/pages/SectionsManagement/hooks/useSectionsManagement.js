import { useState, useCallback, useEffect } from 'react';
import useModals from './useModals';
import useSelection from './useSelection';
import useFilter from './useFilter';

// Mock data for sections
const mockSections = [
  {
    id: 1,
    title: 'Introduction',
    description: 'Welcome section that introduces the company and its mission.',
    status: 'active',
    createdAt: '2023-08-15',
    updatedAt: '2023-09-02',
  },
  {
    id: 2,
    title: 'Product Features',
    description: 'Detailed overview of product features and capabilities.',
    status: 'active',
    createdAt: '2023-08-20',
    updatedAt: '2023-09-10',
  },
  {
    id: 3,
    title: 'Testimonials',
    description: 'Customer testimonials and success stories.',
    status: 'inactive',
    createdAt: '2023-08-25',
    updatedAt: '2023-08-25',
  },
  {
    id: 4,
    title: 'Pricing Plans',
    description: 'Information about pricing and subscription plans.',
    status: 'draft',
    createdAt: '2023-09-01',
    updatedAt: '2023-09-05',
  },
  {
    id: 5,
    title: 'Contact Information',
    description: 'Company contact details and support information.',
    status: 'active',
    createdAt: '2023-09-05',
    updatedAt: '2023-09-05',
  },
];

/**
 * Main hook for SectionsManagement page that combines other hooks
 * @returns {Object} All state and handlers for sections management
 */
const useSectionsManagement = () => {
  // Get data and states from other hooks
  const { sections, isLoading, setIsLoading } = useSectionsData();
  const selection = useSelection(sections);
  const filter = useFilter();
  const modal = useModals();
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper function to validate section object
  const isValidSection = useCallback((section) => {
    return section && 
           typeof section === 'object' && 
           section.id && 
           (typeof section.id === 'string' || typeof section.id === 'number');
  }, []);

  // Return combined state and handlers from all hooks
  return {
    // Section data
    sections,
    isLoading,
    setIsLoading,
    isProcessing,
    setIsProcessing,
    
    // Selection state
    ...selection,
    
    // Filter state
    ...filter,
    
    // Modal state
    ...modal,
    
    // Utility functions
    isValidSection,
  };
};

/**
 * Hook to handle section data fetching and loading state
 * @returns {Object} Section data and loading state
 */
const useSectionsData = () => {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    const fetchSections = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setSections(mockSections);
      } catch (error) {
        console.error('Error fetching sections:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  return { sections, isLoading, setIsLoading };
};

export default useSectionsManagement;
