import React from 'react';
import { Modal, GradientButton, SecondaryButton } from './Modal';

const ResetPasswordModal = ({ isOpen, onClose, onConfirm, user }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
    <p className="text-orange-400 mb-1">Reset password for {user?.name}?</p>
    <p className="text-gray-400 text-sm mb-6">A new password will be generated and sent to the user's email</p>
    <div className="flex justify-end space-x-3">
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      <GradientButton onClick={onConfirm}>Reset Password</GradientButton>
    </div>
  </Modal>
);

export default ResetPasswordModal;
