import React from 'react';
import { Modal, ModalCloseButton, GradientButton, SecondaryButton } from '../common/Modal';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => (
  <Modal isOpen={isOpen} onClose={onClose} width="600px">
    <ModalCloseButton onClose={onClose} />
    <div className="relative">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full filter blur-2xl"></div>
      <div className="relative">
        <h2 className="text-2xl font-bold text-white mb-1">Create New Post</h2>
        <p className="text-orange-400 text-sm mb-6">Add a new update to the What's New section</p>
      </div>
    </div>
    
    <div className="space-y-5 mb-8">
      <div>
        <label className="block text-white mb-2 font-medium">Title*</label>
        <input
          type="text"
          className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 shadow-inner shadow-black/20"
          placeholder="Enter post title"
        />
      </div>
      
      <div>
        <label className="block text-white mb-2 font-medium">Description*</label>
        <textarea
          className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 min-h-[150px] shadow-inner shadow-black/20"
          placeholder="Enter detailed description"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-white mb-2 font-medium">Learn More URL (Optional)</label>
        <div className="flex space-x-2">
          <input
            type="url"
            className="flex-1 bg-[#222]/80 border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 shadow-inner shadow-black/20"
            placeholder="https://example.com/more-info"
          />
          <button
            type="button"
            className="bg-[#333] hover:bg-[#444] text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
            onClick={() => window.open(document.querySelector('input[type="url"]').value, '_blank')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div className="flex justify-end space-x-4 mt-6 relative">
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-orange-500/10 to-purple-600/10 rounded-full filter blur-xl"></div>
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      <GradientButton 
        onClick={onSubmit} 
        className="px-6 py-2.5 text-black font-medium bg-gradient-to-r from-[#7c11ff] via-white to-[#FF8067] shadow-lg"
      >
        Create Post
      </GradientButton>
    </div>
  </Modal>
);

export default CreatePostModal;
