import Stats from "@/components/dashboard/Stats";
import EarningsChart from "@/components/dashboard/EarningsChart";
import RecentClients from "@/components/dashboard/RecentClients";
import SectionsTable from "@/components/dashboard/SectionsTable";
import Button from "@/components/common/Button";

const Dashboard = () => {
  return (
    <div className="animate-fadeIn">
      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-schibsted font-bold text-white mb-1">
            Welcome back!
          </h1>
          <p className="text-text-body">
            Here's what's happening with your platform today.
          </p>
        </div>

        <div className="flex space-x-2">
          <Button variant="secondary" className="px-5 py-2">
            Monthly
          </Button>
          <Button
            variant="primary"
            className="px-5 py-2 text-black font-semibold"
          >
            Yearly
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <Stats />
      </div>

      {/* Middle Section - Chart and Recent Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
