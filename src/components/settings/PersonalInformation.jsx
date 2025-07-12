import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    role: "Administrator",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log("Saving personal information:", formData);

    // Simulate API call
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  const SuccessModal = () => (
    <Modal
      isOpen={showSuccessModal}
      onClose={() => setShowSuccessModal(false)}
      title=""
    >
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
          Personal information has been saved successfully.
        </p>
        <Button
          onClick={() => setShowSuccessModal(false)}
          className="px-6 py-2"
        >
          Continue
        </Button>
      </div>
    </Modal>
  );

  return (
    <>
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} className="px-6 py-2">
            Save Changes
          </Button>
        </div>
      </Card>

      <SuccessModal />
    </>
  );
};

export default PersonalInformation;
