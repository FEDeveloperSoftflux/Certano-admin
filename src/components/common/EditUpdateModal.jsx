import React, { useState } from 'react';
import { Modal, ModalCloseButton, GradientButton, SecondaryButton } from './Modal';

const EditUpdateModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [learnMoreUrl, setLearnMoreUrl] = useState(initialData?.learnMoreUrl || '');

  const handleSubmit = () => {
    const updatedData = {
      title,
      description,
      learnMoreUrl,
      date: initialData?.date || new Date().toLocaleDateString()
    };
    onSubmit(updatedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="600px">
      <ModalCloseButton onClose={onClose} />
      <h2 className="text-3xl font-bold text-white mb-1">Edit Update</h2>
      <p className="text-gray-400 text-sm mb-8">Update the content and details</p>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-white mb-2">Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2">Description*</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300 min-h-[120px]"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2">Learn More URL (Optional)</label>
          <input
            type="url"
            value={learnMoreUrl}
            onChange={(e) => setLearnMoreUrl(e.target.value)}
            placeholder="https://example.com/learn-more"
            className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <GradientButton 
          onClick={handleSubmit}
          className="flex items-center bg-gradient-primary text-black"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Update
        </GradientButton>
      </div>
    </Modal>
  );
};

export default EditUpdateModal;
