import { useState } from "react";
import PersonalInformation from "@/components/settings/PersonalInformation";
import ChangePassword from "@/components/settings/ChangePassword";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SubscriptionPlanControl from "@/components/settings/SubscriptionPlanControl";
import PromotionalOffers from "@/components/settings/PromotionalOffers";
import DiscountSettings from "@/components/settings/DiscountSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      component: PersonalInformation,
    },
    { id: "password", label: "Change Password", component: ChangePassword },
    {
      id: "notifications",
      label: "Notification Settings",
      component: NotificationSettings,
    },
    {
      id: "subscription",
      label: "Subscription Plan Control",
      component: SubscriptionPlanControl,
    },
    // Hidden tabs - content moved to SubscriptionPlanControl
    // {
    //   id: "promotional",
    //   label: "Promotional Offers",
    //   component: PromotionalOffers,
    // },
    // { id: "discount", label: "Discount Settings", component: DiscountSettings },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-schibsted font-bold text-white mb-2">
          Account Settings
        </h1>
        <p className="text-gray-400">
          Manage your account preferences and subscription settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="bg-gray-900/50 rounded-lg p-1 flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-primary text-black text-pretty shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="min-h-[500px]">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default Settings;
