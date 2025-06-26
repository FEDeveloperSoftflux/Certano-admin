import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const DiscountSettings = () => {
  const [discountPercentage, setDiscountPercentage] = useState(25);
  const [showPricingToClients, setShowPricingToClients] = useState(true);
  const [showOfferToClients, setShowOfferToClients] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const originalPrice = 29.0;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const handleSaveSettings = () => {
    console.log("Saving discount settings:", {
      discountPercentage,
      showPricingToClients,
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
          Discount settings have been saved successfully.
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
          Discount Settings
        </h3>
        <p className="text-gray-400">Set discount percentages and visibility</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Discount Percentage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Discount Percentage (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={discountPercentage}
                  onChange={(e) =>
                    setDiscountPercentage(Number(e.target.value))
                  }
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  %
                </span>
              </div>
            </div>

            {/* Show Pricing Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Show pricing to clients
                </h4>
                <p className="text-gray-400 text-sm">
                  Toggle pricing visibility
                </p>
              </div>
              <div className="ml-4">
                <button
                  type="button"
                  onClick={() => setShowPricingToClients(!showPricingToClients)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    showPricingToClients ? "bg-purple-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showPricingToClients ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Show Offer to Clients Toggle */}
          <div className="flex items-center justify-between py-4 border-t border-gray-700">
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

          {/* Preview */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-white font-medium mb-4">Preview</h4>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 line-through text-lg">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-white text-2xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-green-400 text-sm font-medium bg-green-900/20 px-2 py-1 rounded">
                {discountPercentage}% Off
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6 pt-6 border-t border-gray-700">
          <Button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Save Discount Settings
          </Button>
        </div>
      </Card>

      <SuccessModal />
    </div>
  );
};

export default DiscountSettings;
