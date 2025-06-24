import React from 'react';
import { Modal, GradientButton, SecondaryButton } from './Modal';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="text-center">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
        <svg className="w-8 h-8 text-red-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Confirmation!</h2>
      <p className="text-orange-400 mb-1">Are you sure to Delete this User?</p>
      <p className="text-gray-400 text-sm mb-6">make sure it will change in rules as well</p>
      <div className="flex justify-center space-x-3">
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <GradientButton 
          onClick={onConfirm} 
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
        >
          Yes
        </GradientButton>
      </div>
    </div>
  </Modal>
);

export default DeleteConfirmationModal;
