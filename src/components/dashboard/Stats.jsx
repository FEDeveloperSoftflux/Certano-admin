import { useState, useEffect, useRef } from "react";
import { formatPercentage } from "@/utils/helpers/formatters";
import "@/assets/styles/components/card.css";
import cardBg from "@/assets/images/patterns/card-bg.png";

// Import icons
import statsIcon from "@/assets/icons/stats.svg";
import sectionIcon from "@/assets/icons/sectionCount.svg";
import usersIcon from "@/assets/icons/user.svg";
import earningsIcon from "@/assets/icons/earning.svg";

const StatCard = ({ stat, index }) => {
  const { title, value, description, icon, change, changeDirection } = stat;
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      // Add staggered animation delay based on index
      cardElement.style.animationDelay = `${index * 0.1}s`;
    }
  }, [index]);

  // Handle hover effects with React instead of DOM manipulation
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Determine if this is the first card (for special styling)
  const isFirstCard = index === 0;

  return (
    <div
      ref={cardRef}
      className={`card animate-fadeIn w-full relative overflow-hidden transition-all duration-300 rounded-xl ${
        isFirstCard ? "" : "bg-cards-bg"
      }`}
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 10px 25px rgba(0, 0, 0, 0.2)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "1.5rem",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient and pattern for the first card */}
      {isFirstCard && (
        <div className="absolute inset-0 -z-10">
          <div
            style={{ backgroundImage: `url(${cardBg})` }}
            className="w-full h-full bg-cover bg-center rounded-xl"
          ></div>
        </div>
      )}

      {/* Percentage change pill at top right */}
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
            {isFirstCard ? (
              <span className="text-white">{value}</span>
            ) : (
              <span className="text-primary-200">{value}</span>
            )}
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
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            width: "48px",
            height: "48px",
          }}
        >
          <img
            src={icon}
            alt={title}
            className={`w-6 h-6 ${
              isFirstCard ? "brightness-200" : "brightness-200 invert"
            }`}
          />
        </div>
      </div>

      {/* Card glow effect on hover */}
      <div
        className="absolute inset-0 bg-gradient-primary-simple rounded-lg -z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.05 : 0,
        }}
      ></div>
    </div>
  );
};

const Stats = () => {
  const statsData = [
    {
      title: "Total Active Users",
      value: "12,456",
      description: "Currently active platform users",
      icon: usersIcon,
      change: 12.5,
      changeDirection: "up",
    },
    {
      title: "All Sections Count",
      value: "348",
      description: "Total content sections available",
      icon: sectionIcon,
      change: -12.5,
      changeDirection: "down",
    },
    {
      title: "Total Earnings",
      value: "$45,670",
      description: "+$6,750 vs last month",
      icon: earningsIcon,
      change: 12.5,
      changeDirection: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatCard key={stat.title} stat={stat} index={index} />
      ))}
    </div>
  );
};

export default Stats;
