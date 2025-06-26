import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const SubscriptionPlanControl = () => {
  const [currentPlan, setCurrentPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: { monthly: 9.99, annual: 99.99 },
      features: [
        "Up to 5 projects",
        "10GB storage",
        "Email support",
        "Basic analytics",
      ],
      recommended: false,
    },
    {
      id: "pro",
      name: "Professional",
      price: { monthly: 19.99, annual: 199.99 },
      features: [
        "Unlimited projects",
        "100GB storage",
        "Priority support",
        "Advanced analytics",
        "Team collaboration",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: { monthly: 49.99, annual: 499.99 },
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "24/7 phone support",
        "Custom integrations",
        "Advanced security",
        "Dedicated account manager",
      ],
      recommended: false,
    },
  ];

  const handlePlanChange = (planId) => {
    setCurrentPlan(planId);
  };

  const handleUpgrade = () => {
    console.log(
      `Upgrading to ${currentPlan} plan with ${billingCycle} billing`
    );

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
          Subscription plan has been updated successfully.
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

  const calculateSavings = (plan) => {
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annual;
    const savings = monthlyCost - annualCost;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { amount: savings, percentage };
  };

  return (
    <>
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">
          Subscription Plan
        </h3>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-lg flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "annual"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Annual
              <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const savings = calculateSavings(plan);
            const isCurrentPlan = currentPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative border rounded-lg p-6 cursor-pointer transition-all ${
                  isCurrentPlan
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => handlePlanChange(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {plan.name}
                  </h4>
                  <div className="text-3xl font-bold text-white">
                    ${plan.price[billingCycle]}
                    <span className="text-sm text-gray-400 font-normal">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  {billingCycle === "annual" && (
                    <div className="text-green-400 text-xs mt-1">
                      Save ${savings.amount} ({savings.percentage}%)
                    </div>
                  )}
                </div>

                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 text-green-400 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrentPlan && (
                  <div className="flex items-center justify-center">
                    <span className="text-blue-400 font-medium">
                      Current Plan
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Subscription Info */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h4 className="text-white font-medium mb-2">Current Subscription</h4>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-300">
                {plans.find((p) => p.id === currentPlan)?.name} Plan -{" "}
                {billingCycle}
              </p>
              <p className="text-sm text-gray-400">
                Next billing: January 15, 2025
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">
                ${plans.find((p) => p.id === currentPlan)?.price[billingCycle]}/
                {billingCycle === "monthly" ? "mo" : "yr"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="secondary" className="px-4 py-2">
            Cancel Subscription
          </Button>
          <Button onClick={handleUpgrade} className="px-6 py-2">
            Update Plan
          </Button>
        </div>
      </Card>
      <SuccessModal />
    </>
  );
};

export default SubscriptionPlanControl;
