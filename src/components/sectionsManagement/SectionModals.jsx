import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalCloseButton,
  GradientButton,
  SecondaryButton,
} from "../common/Modal";
import { AlertCircle, CheckCircle, X } from "lucide-react";
/**
 * Modal for editing an existing section with AI preview
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {Function} props.onUpdate - Handler for form submission
 * @param {Object} props.section - Section data to edit
 * @returns {JSX.Element} EditSectionModal component
 */
export const EditSectionModal = ({ isOpen, onClose, onUpdate, section }) => {
  // Form state
  const [sectionData, setSectionData] = useState({
    title: "",
    description: "",
    status: "active",
    aiPrompt: "",
  });

  // AI preview state
  const [showAIPreview, setShowAIPreview] = useState(false);
  const [aiPreview, setAIPreview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [initialData, setInitialData] = useState(null);

  // Initialize form with section data when modal opens or section changes
  useEffect(() => {
    if (section && isOpen) {
      const data = {
        title: section.title || "",
        description: section.description || "",
        status: section.status || "active",
        aiPrompt: section.aiPrompt || "",
      };
      setSectionData(data);
      setInitialData(data);
      setHasUnsavedChanges(false);
    }
  }, [section, isOpen]);

  // Track unsaved changes by comparing with initial data
  useEffect(() => {
    if (!initialData) return;

    const isChanged =
      sectionData.title !== initialData.title ||
      sectionData.description !== initialData.description ||
      sectionData.status !== initialData.status ||
      sectionData.aiPrompt !== initialData.aiPrompt;

    setHasUnsavedChanges(isChanged);
  }, [sectionData, initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate AI preview
  const generateAIPreview = async () => {
    if (!sectionData.aiPrompt) return;

    setIsGenerating(true);
    try {
      // Simulate AI API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setAIPreview(`AI-generated content based on: ${sectionData.aiPrompt}
      
This is a preview of what the AI would generate for your section.
The content will be formatted according to your section requirements.

- Point 1: Key information
- Point 2: Supporting details
- Point 3: Additional context

You can modify this content after creation or regenerate with a different prompt.`);
      setShowAIPreview(true);
    } catch (error) {
      console.error("Error generating AI preview:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle applying AI preview content
  const handleApplyPreview = (previewContent) => {
    setSectionData((prev) => ({
      ...prev,
      description: previewContent,
    }));
    setShowAIPreview(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    onUpdate({
      ...section,
      ...sectionData,
    });
  };

  // Handle modal close with unsaved changes
  const handleClose = () => {
    // If there are unsaved changes, show confirmation dialog
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  // Confirm discard changes and close
  const confirmDiscard = () => {
    setShowConfirmDialog(false);
    onClose();
  };

  // Cancel the confirmation dialog
  const cancelConfirmation = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width="600px">
        <ModalCloseButton onClose={handleClose} />
        <h2 className="text-2xl font-bold text-white mb-1">Edit Section</h2>
        <p className="text-gray-400 text-sm mb-6">
          Update section details or generate new AI content
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Section Title</label>
            <input
              type="text"
              name="title"
              value={sectionData.title}
              onChange={handleChange}
              className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50"
              placeholder="Enter section title"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              name="description"
              value={sectionData.description}
              onChange={handleChange}
              className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 min-h-[100px]"
              placeholder="Enter section description"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Status</label>
            <select
              name="status"
              value={sectionData.status}
              onChange={handleChange}
              className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="border-t border-[#333] pt-4 mt-4">
            <h3 className="text-lg font-medium text-white mb-3">
              AI Content Generation
            </h3>

            <div className="mb-4">
              <label className="block text-white mb-2">AI Prompt</label>
              <textarea
                name="aiPrompt"
                value={sectionData.aiPrompt}
                onChange={handleChange}
                className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 min-h-[80px]"
                placeholder="Enter a prompt for AI-generated content"
              />
            </div>

            <div className="flex justify-end mb-4">
              <GradientButton
                onClick={generateAIPreview}
                className={isGenerating ? "opacity-70 cursor-not-allowed" : ""}
                disabled={isGenerating || !sectionData.aiPrompt}
              >
                {isGenerating ? "Generating..." : "Generate AI Preview"}
              </GradientButton>
            </div>

            <AIPreviewModal
              isOpen={showAIPreview}
              onClose={() => setShowAIPreview(false)}
              title="AI Preview"
              description={aiPreview}
              onApply={handleApplyPreview}
              isLoading={isGenerating}
              sectionTitle={sectionData.title}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
            <GradientButton
              onClick={handleSubmit}
              disabled={!sectionData.title || !hasUnsavedChanges}
            >
              Update Section
            </GradientButton>
          </div>
        </div>
      </Modal>

      {/* Confirmation dialog for unsaved changes */}
      <Modal isOpen={showConfirmDialog} onClose={cancelConfirmation}>
        <h2 className="text-2xl font-bold text-white mb-2">Unsaved Changes</h2>
        <p className="text-orange-400 mb-1">You have unsaved changes.</p>
        <p className="text-gray-400 text-sm mb-6">
          Do you want to discard your changes?
        </p>
        <div className="flex justify-end space-x-3">
          <SecondaryButton onClick={cancelConfirmation}>Cancel</SecondaryButton>
          <GradientButton onClick={confirmDiscard}>
            Discard Changes
          </GradientButton>
        </div>
      </Modal>
    </>
  );
};
/**
 * Modal for adding a new section with AI preview
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {Function} props.onSubmit - Handler for form submission
 * @returns {JSX.Element} AddSectionModal component
 */
export const AddSectionModal = ({ isOpen, onClose, onSubmit }) => {
  // Form state
  const [sectionData, setSectionData] = useState({
    title: "Business Contracts",
    description: "",
    status: "active",
    aiPrompt: "",
    scrapingUrl: "",
    reformSensitive: "True",
  });

  // AI preview state
  const [showAIPreview, setShowAIPreview] = useState(false);
  const [aiPreview, setAIPreview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Track unsaved changes
  useEffect(() => {
    const hasContent =
      sectionData.title || sectionData.description || sectionData.aiPrompt;
    setHasUnsavedChanges(hasContent);
  }, [sectionData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate AI preview
  const generateAIPreview = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setAIPreview(
        `What is a Business Contract?
A business contract is a legally enforceable agreement between two or more parties that outlines the rights, responsibilities, and obligations of each party involved in a commercial transaction or relationship.

Key Elements of a Business Contract:
  1. Offer and Acceptance
     One party makes an offer; the other accepts it. This forms the basis of the agreement.
  2. Consideration
     Each party must receive something of value—this could be money, services, or goods.
  3. Mutual Consent
     All parties must agree to the terms willingly and understand what they’re agreeing to.
  4. Legal Purpose
     The contract must involve legal activities (e.g., not for illegal services or goods).
  5. Competent Parties
     All parties must be of legal age and mentally competent.

Common Types of Business Contracts:
  • Service Agreements – For freelancers, consultants, or agencies
  • Sales Contracts – For selling goods or property
  • Partnership Agreements – Between business partners
  • Employment Contracts – Between employer and employee
  • NDA (Non-Disclosure Agreement) – To protect confidential information
  • Lease Agreements – For renting commercial property or equipment

Why Business Contracts Are Important:
  • Define clear expectations and obligations
  • Provide legal protection in case of disputes
  • Help ensure timely payments and deliverables
  • Enhance professionalism and trust`
      );
      setShowAIPreview(true);
    } catch (error) {
      console.error("Error generating AI preview:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle applying AI preview content
  const handleApplyPreview = (previewContent) => {
    setSectionData((prev) => ({
      ...prev,
      description: previewContent,
    }));
    setShowAIPreview(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the onSubmit function
      await onSubmit(sectionData);

      // Show success modal
      setShowSuccessModal(true);

      // Reset form data after successful submission
      setSectionData({
        title: "",
        description: "",
        status: "active",
        aiPrompt: "",
        scrapingUrl: "",
        reformSensitive: "True",
      });
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error creating section:", error);
    } finally {
      setIsCreating(false);
    }
  };

  // Handle modal close with unsaved changes
  const handleClose = () => {
    // If there are unsaved changes, show confirmation dialog
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  // Confirm discard changes and close
  const confirmDiscard = () => {
    setShowConfirmDialog(false);
    onClose();
  };

  // Cancel the confirmation dialog
  const cancelConfirmation = () => {
    setShowConfirmDialog(false);
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose(); // Close the main modal as well
  };

  // Success Modal Component
  const SuccessModal = () => (
    <Modal isOpen={showSuccessModal} onClose={handleSuccessClose} title="">
      <div className="text-center py-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Success!</h3>
        <p className="text-gray-400 mb-6">
          Section has been created successfully.
        </p>
        <GradientButton
          onClick={handleSuccessClose}
          className="px-6 py-2 bg-gradient-primary text-black"
        >
          Continue
        </GradientButton>
      </div>
    </Modal>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} width="580px">
      <ModalCloseButton onClose={handleClose} />
      <h2 className="text-xl font-bold text-white mb-1">Add New Section</h2>
      <p className="text-gray-400 text-xs mb-4">
        Enter the fundamental details for this section
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-white mb-1 text-sm">Title</label>
          <input
            type="text"
            name="title"
            value={sectionData.title}
            onChange={handleChange}
            className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50"
            placeholder="Enter section details"
          />
        </div>

        <div>
          <label className="block text-white mb-1 text-sm">Description</label>
          <textarea
            name="description"
            value={sectionData.description}
            onChange={handleChange}
            className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 min-h-[70px] resize-none"
            placeholder="Enter section details"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white mb-1 text-sm">
              Scraping URL (Required)
            </label>
            <input
              type="url"
              name="scrapingUrl"
              value={sectionData.scrapingUrl || ""}
              onChange={handleChange}
              className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50"
              placeholder="Example.com..."
            />
          </div>

          <div>
            <label className="block text-white mb-1 text-sm">
              Reform Sensitive
            </label>
            <select
              name="reformSensitive"
              value={sectionData.reformSensitive || "True"}
              onChange={handleChange}
              className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50"
            >
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </div>
        </div>

        <div className="border-t border-[#333] pt-3 mt-3">
          <h3 className="text-base font-medium text-white mb-2">
            Template Upload
          </h3>

          <div className="mb-3">
            <label className="block text-white mb-1 text-sm">
              Upload PDF, Word or Form template
            </label>
            <div className="border-2 border-dashed border-[#333] rounded-lg p-4 text-center hover:border-[#555] transition-colors">
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-400 mb-1 text-sm">
                  Click to Upload or drag and drop
                </p>
                <p className="text-gray-500 text-xs">PDF, DOC, or DOCX files</p>
              </div>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-base font-medium text-white mb-2">
              AI Preview & suggestions
            </h3>
            <p className="text-gray-400 text-xs mb-3">
              Generate AI-powered suggestions based on scraped content and
              uploaded templates
            </p>

            <div className="flex justify-end mb-3">
              <GradientButton
                onClick={generateAIPreview}
                className={`bg-gradient-primary text-black text-sm px-4 py-2 ${
                  isGenerating ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate preview"}
              </GradientButton>
            </div>
          </div>

          <AIPreviewModal
            isOpen={showAIPreview}
            onClose={() => setShowAIPreview(false)}
            title={
              <span>
                <span className="text-white">Add New Section</span>
                <span
                  style={{
                    background:
                      "linear-gradient(89.98deg, #FE9624 53.12%, #FE4967 99.56%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {" "}
                  (AI Preview & suggestions)
                </span>
              </span>
            }
            description={aiPreview}
            onApply={handleApplyPreview}
            isLoading={isGenerating}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
          <GradientButton
            onClick={handleSubmit}
            disabled={!sectionData.title || isCreating}
            className="bg-gradient-primary text-black"
          >
            {isCreating ? "Creating..." : "Create Section"}
          </GradientButton>
        </div>
      </div>

      {/* Confirmation dialog for unsaved changes */}
      <Modal isOpen={showConfirmDialog} onClose={cancelConfirmation}>
        <h2 className="text-2xl font-bold text-white mb-2">Unsaved Changes</h2>
        <p className="text-orange-400 mb-1">You have unsaved changes.</p>
        <p className="text-gray-400 text-sm mb-6">
          Do you want to discard your changes?
        </p>
        <div className="flex justify-end space-x-3">
          <SecondaryButton onClick={cancelConfirmation}>Cancel</SecondaryButton>
          <GradientButton
            onClick={confirmDiscard}
            className="bg-gradient-primary text-black"
          >
            Discard Changes
          </GradientButton>
        </div>
      </Modal>

      {/* Success Modal */}
      <SuccessModal />
    </Modal>
  );
};

/**
 * Modal for confirming section deletion
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {Function} props.onConfirm - Handler for confirming the action
 * @param {Object} props.section - Section data
 * @returns {JSX.Element} DeleteSectionModal component
 */
export const DeleteSectionModal = ({ isOpen, onClose, onConfirm, section }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-2xl font-bold text-white mb-2">Confirmation!</h2>
    <p className="text-orange-400 mb-1">Are you sure to Delete this Section?</p>
    <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
    <div className="flex justify-end space-x-3">
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      <GradientButton onClick={onConfirm}>Yes, Delete</GradientButton>
    </div>
  </Modal>
);

/**
 * Modal for previewing AI-generated content
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Handler for closing the modal
 * @param {string} props.title - Title for the preview modal
 * @param {string} props.description - AI-generated content to preview
 * @param {Function} props.onApply - Handler for applying the preview content
 * @param {boolean} props.isLoading - Whether content is currently loading
 * @returns {JSX.Element} AIPreviewModal component
 */
export const AIPreviewModal = ({
  isOpen,
  onClose,
  title,
  description,
  onApply,
  isLoading,
  sectionTitle, // <-- add this prop
}) => {
  const [content, setContent] = useState(description);
  const [edited, setEdited] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [applyLoading, setApplyLoading] = useState(false);

  // Reset state when description changes (new AI generation)
  useEffect(() => {
    setContent(description);
    setEdited(false);
  }, [description]);

  // Reset content when modal is opened
  useEffect(() => {
    if (isOpen) {
      setShowSuccess(false);
      setShowError(false);
    }
  }, [isOpen]);

  // Handle content changes
  const handleContentChange = (e) => {
    setContent(e.target.value);
    setEdited(true);
  };

  // Apply preview with loading state and success feedback
  const handleApply = useCallback(async () => {
    if (!content) return;

    setApplyLoading(true);
    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      onApply(content);
      setShowSuccess(true);

      // Close after showing success message
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      setErrorMessage("Failed to apply preview. Please try again.");
      setShowError(true);

      // Auto-hide error after delay
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } finally {
      setApplyLoading(false);
    }
  }, [content, onApply, onClose]);

  // Handle close with confirmation if edited
  const handleClose = () => {
    if (edited) {
      if (window.confirm("Discard your changes to the preview?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg w-[650px] max-w-[90vw] max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#333] p-3">
          <h3
            className="text-lg font-semibold text-transparent"
            style={{
              background:
                "linear-gradient(89.98deg, #FE9624 53.12%, #FE4967 99.56%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Editable Section Title and Description */}
        <div className="p-4 flex-grow">
          <div className="mb-3">
            <label className="block text-white mb-1 text-sm">Title*</label>
            <input
              type="text"
              name="Title"
              value={"Business Contracts"}
              readOnly
              className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50"
              placeholder="Enter section title"
            />
          </div>
          <div className="mb-3">
            <label className="block text-white mb-1 text-sm">Description</label>
            <textarea
              name="aiContent"
              value={content}
              onChange={handleContentChange}
              className="w-full bg-[#222]/80 border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#9d3fff]/50 h-[300px] resize-none font-normal"
              placeholder="AI-generated content will appear here"
            />
          </div>
        </div>

        {/* Status Messages */}
        {showSuccess && (
          <div className="mx-4 mb-2 px-3 py-2 bg-green-900/30 border border-green-800 rounded-md flex items-center text-green-400 text-sm">
            <CheckCircle size={14} className="mr-2" />
            <span>Preview applied successfully!</span>
          </div>
        )}

        {showError && (
          <div className="mx-4 mb-2 px-3 py-2 bg-red-900/30 border border-red-800 rounded-md flex items-center text-red-400 text-sm">
            <AlertCircle size={14} className="mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-[#333] p-3 flex justify-end space-x-3">
          <SecondaryButton onClick={handleClose} className="text-sm px-4 py-2">
            Cancel
          </SecondaryButton>
          <GradientButton
            onClick={handleApply}
            disabled={isLoading || applyLoading || !content}
            className="bg-gradient-primary text-black text-sm px-4 py-2"
          >
            {applyLoading ? "Applying..." : "Apply Preview"}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

/**
 * Confirmation dialog for unsaved changes
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {Function} props.onClose - Handler for closing the dialog
 * @param {Function} props.onConfirm - Handler for confirming the action
 * @returns {JSX.Element} ConfirmDialog component
 */
export const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2 className="text-2xl font-bold text-white mb-2">Unsaved Changes</h2>
    <p className="text-orange-400 mb-1">You have unsaved changes.</p>
    <p className="text-gray-400 text-sm mb-6">
      Do you want to discard your changes?
    </p>
    <div className="flex justify-end space-x-3">
      <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
      <GradientButton onClick={onConfirm}>Discard Changes</GradientButton>
    </div>
  </Modal>
);
