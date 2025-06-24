import React from 'react';
import { Modal, GradientButton, SecondaryButton } from './Modal';

const BlockUserModal = ({ isOpen, onClose, onConfirm, user }) => (
  <Modal isOpen={isOpen} onClose={onClose} width="400px">
    <div className="text-center">
      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
        <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
        <svg className="w-8 h-8 text-orange-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Block User</h2>
      <p className="text-orange-400 mb-1">Are you sure you want to block {user?.name}?</p>
      <p className="text-gray-400 text-sm mb-6">This action can be reversed later</p>
      <div className="flex justify-center space-x-3">
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <GradientButton 
          onClick={onConfirm} 
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
        >
          Block User
        </GradientButton>
      </div>
    </div>
  </Modal>
);

export default BlockUserModal;
