import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // Handle password change logic
    console.log("Changing password...");

    // Simulate API call
    setTimeout(() => {
      setShowSuccessModal(true);
      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 500);
  };

  const isFormValid =
    passwordData.currentPassword &&
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword === passwordData.confirmPassword;

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
          Password has been changed successfully.
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
          Change Password
        </h3>

        <div className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasswords.current ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasswords.new ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {passwordData.newPassword &&
              passwordData.newPassword.length < 8 && (
                <p className="text-red-400 text-xs mt-1">
                  Password must be at least 8 characters long
                </p>
              )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPasswords.confirm ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {passwordData.confirmPassword &&
              passwordData.newPassword !== passwordData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleChangePassword}
            className="px-6 py-2"
            disabled={!isFormValid}
          >
            Change Password
          </Button>
        </div>
      </Card>

      <SuccessModal />
    </>
  );
};

export default ChangePassword;
