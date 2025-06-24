import React from 'react';
import { Modal, GradientButton, SecondaryButton } from './Modal';

const AddUserModal = ({ isOpen, onClose, onSubmit }) => (
  <Modal isOpen={isOpen} onClose={onClose} width="600px">
    <h2 className="text-3xl font-bold text-white mb-1">Add New User</h2>
    <p className="text-gray-400 text-sm mb-8">Create a new user account with custom subscription settings</p>
    
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-white mb-2">Name*</label>
        <input
          type="text"
          placeholder="Enter full name"
          className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300"
        />
      </div>
      <div>
        <label className="block text-white mb-2">Email*</label>
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300"
        />
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-white mb-2">Password*</label>
      <input
        type="password"
        placeholder="Enter password"
        className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300"
      />
    </div>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-white mb-2">Role</label>
        <select className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 appearance-none">
          <option>User</option>
          <option>Admin</option>
        </select>
      </div>
      <div>
        <label className="block text-white mb-2">Plan Type</label>
        <select className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 appearance-none">
          <option>Trial</option>
          <option>Basic</option>
          <option>Premium</option>
        </select>
      </div>
    </div>

    <div className="mb-8">
      <label className="block text-white mb-2">Subscription Period (Days)</label>
      <input
        type="number"
        defaultValue="7"
        className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300"
      />
    </div>

    <div className="flex justify-end space-x-3">
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      <GradientButton 
        onClick={onSubmit}
        className="flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add User
      </GradientButton>
    </div>
  </Modal>
);

export default AddUserModal;
