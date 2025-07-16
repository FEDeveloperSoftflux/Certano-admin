import React, { useState } from 'react';
import ReportStats from '@/components/reporting/ReportStats';
import TopClients from '@/components/reporting/TopClients';
import TransactionsTable from '@/components/reporting/TransactionsTable';
import EarningsChart from '@/components/dashboard/EarningsChart';
import Filters from '@/components/reporting/Filters';
import ExportPDFModal from '@/components/reporting/ExportPDFModal';
import { useResponsive } from '@/hooks/useResponsive';

const ReportingPage = () => {
  const { isMobile } = useResponsive();
  // State for PDF modal visibility
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  
  // Open PDF modal handler
  const handleOpenPDFModal = () => {
    setIsPDFModalOpen(true);
  };
  
  // Close PDF modal handler
  const handleClosePDFModal = () => {
    setIsPDFModalOpen(false);
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-schibsted font-bold text-white mb-1">Earning Report</h1>
        <p className="text-text-body text-sm md:text-base">Track your income and analyze your financial performance</p>
      </div>

      {/* Stat Cards */}
      <ReportStats />

      {/* Filters */}
      <Filters onExportPDF={handleOpenPDFModal} />

      {/* Monthly Earnings Trend & Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
        <div>
          <h3 className="font-schibsted text-lg md:text-2xl text-white mb-3 md:mb-4">Monthly Earnings Trend</h3>
          <EarningsChart />
        </div>
        <TopClients />
      </div>

      {/* Recent Transactions */}
      <TransactionsTable />

      {/* PDF Export Modal */}
      <ExportPDFModal 
        isOpen={isPDFModalOpen} 
        onClose={handleClosePDFModal} 
      />
    </div>
  );
};

export default ReportingPage;
