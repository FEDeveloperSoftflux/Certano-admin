import { NavLink } from "react-router-dom";
import { navItems } from "@/utils/constants/navigation";
import bgPattern from "@/assets/images/patterns/nav-bg.png";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-panels-bg text-white flex flex-col z-10">
      <div
        className="px-8 py-8 flex items-center"
        style={{
          height: "90px",
        }}
      >
        <h1 className="text-2xl font-schibsted font-bold text-white">
          Certano AI
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
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
                        isActive ? "z-10 brightness-125" : "opacity-75"
                      }`}
                    />
                    <span
                      className={`font-schibsted relative text-[15px] ${
                        isActive ? "z-10 text-white" : ""
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

      <div
        className="p-6 mx-4 mb-6 rounded-xl relative overflow-hidden"
        style={{
          background:
            "linear-gradient(93.17deg, #9148d9 1.94%, #ff8067 106.84%)",
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-transparent"></div>
        <div className="relative z-10 text-white">
          <h3 className="font-schibsted font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-white/80 mb-4">
            Contact our support team for assistance
          </p>
          <button className="bg-white/15 hover:bg-white/25 text-white w-full py-2.5 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
