import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const PromotionalOffers = () => {
  const [offerText, setOfferText] = useState(
    "Limited Time: 50% Off First Month!"
  );
  const [showOfferToClients, setShowOfferToClients] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSaveSettings = () => {
    console.log("Saving promotional offer settings:", {
      offerText,
      showOfferToClients,
    });

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
          Promotional offer settings have been saved successfully.
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
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Promotional Offers
        </h3>
        <p className="text-gray-400">Manage special offers and promotions</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Offer Text */}
          <div>
            <label className="block text-md font-medium text-gray-400 mb-2">
              Offer Text
            </label>
            <textarea
              value={offerText}
              onChange={(e) => setOfferText(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows="3"
              placeholder="Enter promotional offer text"
            />
          </div>

          {/* Show Offer Toggle */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h4 className="text-white font-medium">Show Offer to Clients</h4>
              <p className="text-gray-400 text-sm">
                Toggle offer visibility on client side
              </p>
            </div>
            <div className="ml-4">
              <button
                type="button"
                onClick={() => setShowOfferToClients(!showOfferToClients)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  showOfferToClients ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showOfferToClients ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6 pt-6 border-t border-gray-700">
          <Button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Save Offer Settings
          </Button>
        </div>
      </Card>

      <SuccessModal />
    </div>
  );
};

export default PromotionalOffers;
