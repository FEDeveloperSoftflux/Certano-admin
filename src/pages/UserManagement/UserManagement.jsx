import React, { useState } from "react";
import Card from "@/components/common/Card";
import useUserManagement from "./hooks/useUserManagement";
import { LoadingOverlay } from "./components/common";
import UserTable from "./components/UserTable";
import TableActions from "./components/TableActions";
import Pagination from "./components/Pagination";
import PageHeader from "./components/PageHeader";
import {
  PasswordChangeModal,
  DeleteConfirmationModal,
  BlockUserModal,
  ResetPasswordModal,
  SuccessModal,
  AddUserModal,
} from "@/components/userManagement";

/**
 * Main UserManagement component
 * Manages users with a table interface, filters, and actions
 * 
 * @returns {JSX.Element} UserManagement page
 */
const UserManagement = () => {
  const {
    users,
    selectedRows,
    isLoading,
    isProcessing,
    activeModal,
    currentUser,
    isSuccessMessageOpen,
    successMessage,
    passwordVisibility,
    togglePasswordVisibility,
    openModal,
    closeAllModals,
    showSuccessMessage,
    isValidUser,
  } = useUserManagement();

  // Handler for delete action
  const handleDeleteUser = async () => {
    try {
      // Determine deletion type
      const isMultipleDelete = currentUser === null || currentUser === undefined;
      const selectedCount = selectedRows.length;
      
      // Success message with appropriate text
      if (isMultipleDelete && selectedCount > 0) {
        showSuccessMessage(`${selectedCount} users have been deleted successfully!`);
      } else if (isValidUser(currentUser)) {
        const userName = currentUser.name || 'Selected user';
        showSuccessMessage(`${userName} has been deleted successfully!`);
      } else {
        showSuccessMessage("User has been deleted successfully!");
      }
    } catch (error) {
      console.error('Error during user deletion:', error);
      showSuccessMessage("User deletion completed with some errors");
    }
  };
  
  // Handler for add user action
  const handleAddUser = async () => {
    try {
      // Add user logic here
      showSuccessMessage("User has been added successfully!");
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // This would be calculated based on data and page size

  return (
    <div className="animate-fadeIn">
      <PageHeader
        title="User Management"
        description="Manage your team members and their account permissions here."
      />

      <Card className="w-full bg-[#1a1a1a] shadow-lg">
        {isLoading && <LoadingOverlay />}
        
        <TableActions 
          selectedCount={selectedRows.length}
          isProcessing={isProcessing}
          isLoading={isLoading}
          onDelete={() => openModal("deleteUser")}
          onAddUser={() => openModal("addUser")}
        />

        <UserTable 
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
      </Card>

      {/* Render all modals */}
      <PasswordChangeModal
        isOpen={activeModal === "passwordChange"}
        onClose={closeAllModals}
        onSubmit={() => {
          // Handle password change
          showSuccessMessage("Password has been changed successfully!");
        }}
        user={currentUser}
        passwordVisibility={passwordVisibility}
        togglePasswordVisibility={togglePasswordVisibility}
        isLoading={isLoading}
      />

      <ResetPasswordModal
        isOpen={activeModal === "passwordReset"}
        onClose={closeAllModals}
        onConfirm={() => {
          // Handle password reset
          showSuccessMessage("Password has been reset successfully!");
        }}
        user={currentUser}
        isLoading={isLoading}
      />

      <BlockUserModal
        isOpen={activeModal === "blockUser"}
        onClose={closeAllModals}
        onConfirm={() => {
          // Handle user block
          showSuccessMessage("User has been blocked successfully!");
        }}
        user={currentUser}
        isLoading={isLoading}
      />

      <DeleteConfirmationModal
        isOpen={activeModal === "deleteUser"}
        onClose={closeAllModals}
        onConfirm={handleDeleteUser}
        user={currentUser}
      />

      <AddUserModal
        isOpen={activeModal === "addUser"}
        onClose={closeAllModals}
        onSubmit={handleAddUser}
      />

      <SuccessModal
        isOpen={isSuccessMessageOpen}
        onClose={() => setIsSuccessMessageOpen(false)}
        message={successMessage}
      />
    </div>
  );
};

export default UserManagement;
