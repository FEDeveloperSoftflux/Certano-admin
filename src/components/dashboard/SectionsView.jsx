import { useState } from "react";
import updateIcon from "../../assets/icons/update.svg";
import { motion } from "framer-motion";

// Extended mock data for the detailed view
const extendedMockSections = [
  {
    id: "01",
    title: "Advanced React Patterns",
    category: "Development",
    hasNotification: true,
    lastUpdate: "2 days ago",
    status: "Needs Update",
    progress: 85,
  },
  {
    id: "02",
    title: "Advanced React Patterns",
    category: "Development",
    hasNotification: false,
    lastUpdate: "1 week ago",
    status: "Up to Date",
    progress: 100,
  },
  {
    id: "03",
    title: "Advanced React Patterns",
    category: "Development",
    hasNotification: false,
    lastUpdate: "3 days ago",
    status: "In Progress",
    progress: 68,
  },
  {
    id: "04",
    title: "JavaScript Fundamentals",
    category: "Development",
    hasNotification: true,
    lastUpdate: "5 days ago",
    status: "Needs Update",
    progress: 72,
  },
  {
    id: "05",
    title: "CSS Animations Master",
    category: "Design",
    hasNotification: false,
    lastUpdate: "2 weeks ago",
    status: "Up to Date",
    progress: 100,
  },
  {
    id: "06",
    title: "UX/UI Design Principles",
    category: "Design",
    hasNotification: true,
    lastUpdate: "1 day ago",
    status: "Needs Review",
    progress: 90,
  },
];

const SectionItem = ({ section }) => {
  // Determine status styling
  const getStatusStyles = (status) => {
    switch (status) {
      case "Needs Update":
        return {
          bgColor: "bg-red-500/10",
          textColor: "text-red-400",
          dotColor: "bg-red-400",
          borderColor: "border-red-400/20",
        };
      case "Up to Date":
        return {
          bgColor: "bg-green-500/10",
          textColor: "text-green-400",
          dotColor: "bg-green-400",
          borderColor: "border-green-400/20",
        };
      case "In Progress":
        return {
          bgColor: "bg-yellow-500/10",
          textColor: "text-yellow-400",
          dotColor: "bg-yellow-400",
          borderColor: "border-yellow-400/20",
        };
      case "Needs Review":
        return {
          bgColor: "bg-orange-500/10",
          textColor: "text-orange-400",
          dotColor: "bg-orange-400",
          borderColor: "border-orange-400/20",
        };
      default:
        return {
          bgColor: "bg-blue-500/10",
          textColor: "text-blue-400",
          dotColor: "bg-blue-400",
          borderColor: "border-blue-400/20",
        };
    }
  };

  const statusStyles = getStatusStyles(section.status);

  return (
    <div className="flex items-center py-3 px-4 hover:bg-white/5 rounded-lg transition-all duration-300">
      <div className="w-8 h-8 rounded-full bg-cards-alt-bg flex items-center justify-center mr-4 text-sm text-white font-schibsted">
        {section.id}
      </div>
      <div className="flex-1 flex items-center">
        <div className="w-2/5">
          <div className="flex items-center">
            <h4 className="text-white font-schibsted">{section.title}</h4>
            {section.hasNotification && (
              <div className="ml-3">
                <img
                  src={updateIcon}
                  alt="Update needed"
                  className="w-4 h-4 animate-pulse"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-text-body">{section.category}</p>
        </div>

        <div className="w-1/5">
          <div className={`flex items-center`}>
            <div
              className={`w-2 h-2 rounded-full ${statusStyles.dotColor} mr-2`}
            ></div>
            <span
              className={`text-sm ${statusStyles.textColor} px-2 py-0.5 rounded-full ${statusStyles.bgColor} border ${statusStyles.borderColor}`}
            >
              {section.status}
            </span>
          </div>
          <p className="text-xs text-text-body mt-1">
            Last updated {section.lastUpdate}
          </p>
        </div>

        <div className="w-1/5 flex items-center">
          <div className="w-full bg-gray-800/30 rounded-full h-2.5 mr-2">
            <div
              className={`h-2.5 rounded-full ${
                section.progress === 100
                  ? "bg-gradient-primary-simple"
                  : section.progress > 70
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              } relative overflow-hidden`}
              style={{
                width: `${section.progress}%`,
                opacity: 0.7 + (section.progress / 100) * 0.3, // Adjust opacity based on progress
              }}
            >
              {section.progress > 60 && (
                <span className="absolute inset-0 bg-white/10 bg-[url('../../assets/images/pattern-1.svg')] bg-no-repeat bg-cover opacity-10"></span>
              )}
            </div>
          </div>
          <span className="text-xs text-white">{section.progress}%</span>
        </div>

        <div className="w-1/5 text-right">
          <button className="text-white text-sm transition-all duration-300 px-3 py-1 rounded-full bg-gradient-primary-simple hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 relative overflow-hidden">
            <span className="absolute inset-0 bg-white/10 bg-[url('../../assets/images/pattern-1.svg')] bg-no-repeat bg-cover opacity-5"></span>
            <span className="relative z-10">View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionsView = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = extendedMockSections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(extendedMockSections.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "monthly"
                ? "bg-gradient-primary-simple text-white shadow-md shadow-indigo-500/20 relative overflow-hidden"
                : "text-text-body hover:text-white hover:bg-white/5"
            }`}
            onClick={() => setActiveTab("monthly")}
          >
            {activeTab === "monthly" && (
              <span className="absolute inset-0 bg-white/10 bg-[url('../../assets/images/pattern-1.svg')] bg-no-repeat bg-cover opacity-10"></span>
            )}
            <span className="relative z-10">Monthly</span>
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "yearly"
                ? "bg-gradient-primary-simple text-white shadow-md shadow-indigo-500/20 relative overflow-hidden"
                : "text-text-body hover:text-white hover:bg-white/5"
            }`}
            onClick={() => setActiveTab("yearly")}
          >
            {activeTab === "yearly" && (
              <span className="absolute inset-0 bg-white/10 bg-[url('../../assets/images/pattern-1.svg')] bg-no-repeat bg-cover opacity-10"></span>
            )}
            <span className="relative z-10">Yearly</span>
          </button>
        </div>

        <div className="text-text-body text-sm">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, extendedMockSections.length)} of{" "}
          {extendedMockSections.length}
        </div>
      </div>

      {/* Column Headers */}
      <div className="flex items-center py-3 px-4 border-b border-white/10 text-sm text-text-body font-medium">
        <div className="w-8 mr-4"></div>
        <div className="flex-1 flex items-center">
          <div className="w-2/5">Section</div>
          <div className="w-1/5">Status</div>
          <div className="w-1/5">Progress</div>
          <div className="w-1/5 text-right">Action</div>
        </div>
      </div>
      <div className="space-y-1 my-4">
        {currentItems.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <SectionItem section={section} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-1.5 rounded-lg transition-all duration-300 ${
              currentPage === 1
                ? "text-text-body cursor-not-allowed opacity-50"
                : "text-white hover:bg-white/10 hover:shadow-sm hover:-translate-x-0.5"
            }`}
          >
            ← Previous
          </button>

          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-full transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-gradient-primary-simple text-white shadow-md shadow-indigo-500/20 transform scale-110 relative overflow-hidden"
                    : "text-text-body hover:text-white hover:bg-white/10 hover:scale-105"
                }`}
              >
                {currentPage === i + 1 && (
                  <span className="absolute inset-0 bg-white/10 bg-[url('../../assets/images/pattern-1.svg')] bg-no-repeat bg-cover opacity-10"></span>
                )}
                <span className="relative z-10">{i + 1}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-1.5 rounded-lg transition-all duration-300 ${
              currentPage === totalPages
                ? "text-text-body cursor-not-allowed opacity-50"
                : "text-white hover:bg-white/10 hover:shadow-sm hover:translate-x-0.5"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionsView;
