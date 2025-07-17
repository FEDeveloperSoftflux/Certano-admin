import { NavLink } from "react-router-dom";
import { navItems } from "@/utils/constants/navigation";
import bgPattern from "@/assets/images/patterns/nav-bg.png";
import { useSidebar } from "../../contexts/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, isMobile, handleNavClick, closeSidebar } = useSidebar();

  return (
    <aside
      className={`w-64 h-screen fixed left-0 top-0 bg-black text-white flex flex-col z-50 transition-transform duration-300 ease-in-out ${
        isMobile 
          ? `transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} rounded-none` 
          : 'rounded-3xl m-2'
      }`}
      style={{ height: isMobile ? "100vh" : "calc(100vh - 16px)" }}
    >
      <div
        className="px-8 py-8 flex items-center justify-between"
        style={{
          height: "90px",
        }}
      >
        <h1 className="text-2xl font-schibsted text-white">Certano AI</h1>
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) => `
                  flex items-center px-5 py-3.5 rounded-xl transition-all duration-300 relative
                  ${
                    isActive
                      ? "bg-gradient-primary before:absolute before:inset-0 before:bg-black/15 before:rounded-xl font-medium shadow-[0_4px_20px_rgba(145,72,217,0.3)]"
                      : "text-gray-400/70 hover:text-gray-400/90 hover:bg-white/5"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={item.icon}
                      alt={`${item.title} icon`}
                      className={`w-5 h-5 mr-3.5 relative ${
                        isActive ? "z-10 brightness-125 invert" : "opacity-75"
                      }`}
                    />
                    <span
                      className={`font-schibsted relative text-[15px] ${
                        isActive ? "z-10 text-white invert" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom gradient decoration with bgPattern */}
      <div className="mt-auto">
        <div 
          className="h-24 mx-4 mb-4 rounded-xl relative overflow-hidden opacity-60"
          style={{
            background:
              "linear-gradient(135deg, #9148d9 0%, #ff8067 70%, #9148d9 100%)",
            backgroundImage: `url(${bgPattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundBlendMode: "soft-light",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-orange-500/10"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
