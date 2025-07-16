import { useState } from "react";
import { useLocation } from "react-router-dom";
import { mockUser } from "@/utils/constants/navigation";
import notifiIcon from "@/assets/icons/notification.svg";
import { useSidebar } from "../../contexts/SidebarContext";

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isMobile, toggleSidebar } = useSidebar();

  // Format the current path for display
  const formatPathName = (pathname) => {
    const path = pathname.split("/")[1];
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
  };

  const pageName = formatPathName(location.pathname);

  return (
    <header className="flex justify-between items-center py-6 px-4 md:px-8">
      <div className="flex items-center">
        {/* Hamburger menu for mobile */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="mr-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <h1 className="text-xl md:text-2xl font-schibsted font-bold text-white">
          {pageName}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-white/5 transition-all">
          <img src={notifiIcon} alt="Notifications" className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 md:space-x-3 p-2 rounded-lg hover:bg-white/5 transition-all"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="rounded-full w-8 h-8 overflow-hidden border-2 border-[#CBA7FF]">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-white font-schibsted">{mockUser.name}</p>
              <p className="text-xs text-text-body">{mockUser.email}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-cards-bg rounded-lg shadow-lg py-2 z-10 animate-fadeIn">
              <a href="#profile" className="block px-4 py-2 hover:bg-white/5">
                Profile
              </a>
              <a href="#settings" className="block px-4 py-2 hover:bg-white/5">
                Settings
              </a>
              <hr className="my-2 border-white/10" />
              <a
                href="#logout"
                className="block px-4 py-2 text-red-400 hover:bg-white/5"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
