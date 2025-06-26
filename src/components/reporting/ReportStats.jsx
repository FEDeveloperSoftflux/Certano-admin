import React from "react";
import Card from "@/components/common/Card";
import usersIcon from "@/assets/icons/user.svg";
import earningsIcon from "@/assets/icons/earning.svg";
import statsIcon from "@/assets/icons/stats.svg";
import { formatPercentage } from "@/utils/helpers/formatters";
import cardBg from "@/assets/images/patterns/card-bg.png";

// Custom stat card component that matches the design
const CustomStatCard = ({
  title,
  value,
  description,
  icon,
  change,
  changeDirection,
  isFirstCard,
}) => {
  return (
    <Card
      className={`w-full relative overflow-hidden transition-all duration-300 rounded-xl`}
      style={
        isFirstCard
          ? {
              backgroundImage: `url(${cardBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {/* Remove the overlay div for the first card */}
      <div className="p-6 relative z-10">
        {/* Percentage change pill if available */}
        {change !== undefined && (
          <div className="absolute bottom-4 right-4">
            <div
              className={`rounded-full px-3 py-1 text-xs font-medium flex items-center ${
                isFirstCard
                  ? "bg-white/20 backdrop-blur-sm text-white"
                  : changeDirection === "up"
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {changeDirection === "up" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                >
                  <path
                    d="M10 4L14 8M10 4L6 8M10 4V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                >
                  <path
                    d="M10 16L14 12M10 16L6 12M10 16V4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {formatPercentage(change)}
            </div>
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <h3
              className={`text-sm font-medium mb-2 ${
                isFirstCard ? "text-white/80" : "text-text-body"
              }`}
            >
              {title}
            </h3>
            <div className="font-schibsted text-4xl font-bold mb-2">
              <span className="text-white">{value}</span>
            </div>
            <p
              className={`text-sm ${
                isFirstCard ? "text-white/70" : "text-text-body"
              }`}
            >
              {description}
            </p>
          </div>

          <div
            className={`rounded-full transition-all duration-300 flex items-center justify-center ${
              isFirstCard
                ? "bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-sm"
                : "bg-gradient-to-br from-primary-600 to-primary-800"
            }`}
            style={{
              width: "48px",
              height: "48px",
            }}
          >
            <img
              src={icon}
              alt={title}
              className="w-6 h-6 filter brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const ReportStats = () => {
  const statsData = [
    {
      title: "Last Month",
      value: "$0",
      description: "Previous month earnings",
      icon: usersIcon,
      isFirstCard: true,
    },
    {
      title: "Total Earning",
      value: "$45,670",
      description: "Lifetime earnings",
      icon: earningsIcon,
      change: 12.5,
      changeDirection: "up",
      isFirstCard: false,
    },
    {
      title: "Avg Transaction",
      value: "$2,670",
      description: "Per transaction",
      icon: statsIcon,
      change: 12.5,
      changeDirection: "up",
      isFirstCard: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <CustomStatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default ReportStats;
