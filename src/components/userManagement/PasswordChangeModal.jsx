import React from 'react';
import { Modal, ModalCloseButton, GradientButton, SecondaryButton } from './Modal';

const PasswordChangeModal = ({ isOpen, onClose, user, onSubmit, passwordVisibility, togglePasswordVisibility }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalCloseButton onClose={onClose} />
    <h2 className="text-2xl font-bold text-white mb-1">Change Password</h2>
    <p className="text-gray-400 text-sm mb-6">Update the password for {user?.name}</p>
    
    <div className="space-y-4">
      <div>
        <label className="block text-white mb-2">New Password</label>
        <div className="relative group">
          <input
            type={passwordVisibility.newPassword ? "text" : "password"}
            className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 group-hover:border-[#444]"
            placeholder="Enter new password"
          />
          <button
            onClick={() => togglePasswordVisibility('newPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={passwordVisibility.newPassword 
                  ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} 
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-white mb-2">Confirm New Password</label>
        <div className="relative group">
          <input
            type={passwordVisibility.confirmPassword ? "text" : "password"}
            className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 group-hover:border-[#444]"
            placeholder="Confirm new password"
          />
          <button
            onClick={() => togglePasswordVisibility('confirmPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={passwordVisibility.confirmPassword 
                  ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} 
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <GradientButton onClick={onSubmit}>Update Password</GradientButton>
      </div>
    </div>
  </Modal>
);

export default PasswordChangeModal;
