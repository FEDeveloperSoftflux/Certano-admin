import { useState } from "react";
import { useResponsive } from "@/hooks/useResponsive";
import PersonalInformation from "@/components/settings/PersonalInformation";
import ChangePassword from "@/components/settings/ChangePassword";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SubscriptionPlanControl from "@/components/settings/SubscriptionPlanControl";
import PromotionalOffers from "@/components/settings/PromotionalOffers";
import DiscountSettings from "@/components/settings/DiscountSettings";

const Settings = () => {
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      shortLabel: "Personal",
      component: PersonalInformation,
    },
    { 
      id: "password", 
      label: "Change Password", 
      shortLabel: "Password",
      component: ChangePassword 
    },
    {
      id: "notifications",
      label: "Notification Settings",
      shortLabel: "Notifications",
      component: NotificationSettings,
    },
    {
      id: "subscription",
      label: "Subscription Plan Control",
      shortLabel: "Subscription",
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
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-schibsted font-bold text-white mb-2">
          Account Settings
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Manage your account preferences and subscription settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 md:mb-8">
        <div className="bg-gray-900/50 rounded-lg p-1 flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap flex-1 md:flex-none ${
                activeTab === tab.id
                  ? "bg-gradient-primary text-black text-pretty shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {isMobile ? tab.shortLabel : tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="min-h-[400px] md:min-h-[500px]">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default Settings;
