import React, { useState, useMemo } from "react";
import Card from "@/components/common/Card";
import useSectionsManagement from "./hooks/useSectionsManagement";
import { LoadingOverlay } from "./components/common";
import SectionsTable from "./components/SectionsTable";
import TableActions from "./components/TableActions";
import Pagination from "./components/Pagination";
import PageHeader from "./components/PageHeader";
import { 
  AddSectionModal, 
  EditSectionModal,
  DeleteSectionModal, 
  ConfirmDialog 
} from "@/components/sectionsManagement/SectionModals";
import { SuccessModal } from "@/components/common/Modal";
import NoDataMessage from "./components/NoDataMessage";

/**
 * Main SectionsManagement component
 * Manages sections with a table interface, filters, and actions
 * 
 * @returns {JSX.Element} SectionsManagement page
 */
const SectionsManagement = () => {
  const {
    sections,
    selectedRows,
    isLoading,
    isProcessing,
    activeModal,
    currentSection,
    isSuccessMessageOpen,
    successMessage,
    setIsSuccessMessageOpen,
    isConfirmDialogOpen,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    openModal,
    closeAllModals,
    showSuccessMessage,
    confirmPendingAction,
    cancelPendingAction,
    selectRow,
    selectAll,
    isValidSection,
  } = useSectionsManagement();

  // Handler for delete action
  const handleDeleteSection = async () => {
    try {
      setIsProcessing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Determine deletion type
      const isMultipleDelete = currentSection === null || currentSection === undefined;
      const selectedCount = selectedRows.length;
      
      // Success message with appropriate text
      if (isMultipleDelete && selectedCount > 0) {
        showSuccessMessage(`${selectedCount} sections have been deleted successfully!`);
      } else if (isValidSection(currentSection)) {
        const sectionTitle = currentSection.title || 'Selected section';
        showSuccessMessage(`${sectionTitle} has been deleted successfully!`);
      } else {
        showSuccessMessage("Section has been deleted successfully!");
      }
    } catch (error) {
      console.error('Error during section deletion:', error);
      showSuccessMessage("Section deletion completed with some errors");
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handler for add section action
  const handleAddSection = async (sectionData) => {
    try {
      setIsProcessing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('New section data:', sectionData);
      showSuccessMessage("Section has been added successfully!");
    } catch (error) {
      console.error('Error adding section:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handler for edit section action
  const handleEditSection = async (sectionData) => {
    try {
      setIsProcessing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Updated section data:', sectionData);
      showSuccessMessage("Section has been updated successfully!");
    } catch (error) {
      console.error('Error updating section:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Pagination state
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate filtered sections based on search and filters
  const filteredSections = useMemo(() => {
    // Apply search and filters here when implemented
    return sections;
  }, [sections]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage);
  
  // Get current page data
  const currentSections = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSections.slice(startIndex, endIndex);
  }, [filteredSections, currentPage, itemsPerPage]);
  
  // No data state
  const hasNoData = !isLoading && filteredSections.length === 0;

  return (
    <div className="animate-fadeIn">
      <PageHeader
        title="Sections Management"
        description="Manage website sections and their content here."
      />

      <Card className="w-full bg-[#1a1a1a] shadow-lg relative">
        {isLoading && <LoadingOverlay />}
        {isProcessing && <LoadingOverlay message="Processing..." opacity={70} />}
        
        <TableActions 
          selectedCount={selectedRows.length}
          isProcessing={isProcessing}
          isLoading={isLoading}
          onDelete={() => openModal("deleteSection")}
          onAddSection={() => openModal("addSection")}
          // Add filter/search handlers here when implemented
        />

        {hasNoData ? (
          <NoDataMessage 
            message="No sections found" 
            ctaText="Add New Section" 
            onCta={() => openModal("addSection")}
          />
        ) : (
          <>
            <SectionsTable 
              sections={currentSections}
              selectedRows={selectedRows}
              onSelectRow={selectRow}
              onSelectAll={selectAll}
              isProcessing={isProcessing}
              isLoading={isLoading}
              openModal={openModal}
            />

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isDisabled={isProcessing || isLoading}
            />
          </>
        )}
      </Card>

      {/* Render all modals */}
      <AddSectionModal
        isOpen={activeModal === "addSection"}
        onClose={closeAllModals}
        onSubmit={handleAddSection}
      />
      
      <EditSectionModal
        isOpen={activeModal === "editSection"}
        onClose={closeAllModals}
        onUpdate={handleEditSection}
        section={currentSection}
      />

      <DeleteSectionModal
        isOpen={activeModal === "deleteSection"}
        onClose={closeAllModals}
        onConfirm={handleDeleteSection}
        section={currentSection}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={cancelPendingAction}
        onConfirm={confirmPendingAction}
      />

      <SuccessModal
        isOpen={isSuccessMessageOpen}
        message={successMessage}
        onClose={() => setIsSuccessMessageOpen(false)}
      />
    </div>
  );
};

export default SectionsManagement;
