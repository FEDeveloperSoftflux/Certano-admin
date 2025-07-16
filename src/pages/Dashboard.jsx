import Stats from "@/components/dashboard/Stats";
import EarningsChart from "@/components/dashboard/EarningsChart";
import RecentClients from "@/components/dashboard/RecentClients";
import SectionsTable from "@/components/dashboard/SectionsTable";
import Button from "@/components/common/Button";
import { useResponsive } from "@/hooks/useResponsive";

const Dashboard = () => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="animate-fadeIn">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-schibsted font-bold text-white mb-1">
            Welcome back!
          </h1>
          <p className="text-text-body text-sm md:text-base">
            Here's what's happening with your platform today.
          </p>
        </div>

        <div className="flex space-x-2">
          <Button variant="secondary" className="px-3 md:px-5 py-2 text-sm md:text-base">
            Monthly
          </Button>
          <Button
            variant="primary"
            className="px-3 md:px-5 py-2 text-sm md:text-base text-black font-semibold bg-gradient-primary"
          >
            Yearly
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 md:mb-8">
        <Stats />
      </div>

      {/* Middle Section - Chart and Recent Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
        <EarningsChart />
        <RecentClients />
      </div>

      {/* Bottom Section - Sections Table */}
      <div>
        <SectionsTable />
      </div>
    </div>
  );
};

export default Dashboard;
