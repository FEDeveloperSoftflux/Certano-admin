import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    sectionUpdates: false,
    UserSignupAlerts: true,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleToggle = (setting) => {
    setNotifications((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = () => {
    console.log("Saving notification settings:", notifications);

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
          Notification settings have been saved successfully.
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

  const ToggleSwitch = ({ id, checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0">
      <div className="flex-1">
        <h4 className="text-white font-medium">{label}</h4>
        {description && (
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        )}
      </div>
      <div className="ml-4">
        <button
          type="button"
          onClick={() => onChange(id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            checked ? "bg-purple-600" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          Notification Settings
        </h3>

        <div className="space-y-0">
          <ToggleSwitch
            id="emailUpdates"
            checked={notifications.emailUpdates}
            onChange={handleToggle}
            label="Email Alerts"
            description="Receive important notifications via email"
          />

          <ToggleSwitch
            id="sectionUpdates"
            checked={notifications.sectionUpdates}
            onChange={handleToggle}
            label="Section Update Notices"
            description="Get notified when sections are updated"
          />

          <ToggleSwitch
            id="UserSignupAlerts"
            checked={notifications.UserSignupAlerts}
            onChange={handleToggle}
            label="User Signup Notices"
            description="Receive notifications when new users sign up"
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} className="px-6 py-2">
            Save Preferences
          </Button>
        </div>
      </Card>

      <SuccessModal />
    </>
  );
};

export default NotificationSettings;
