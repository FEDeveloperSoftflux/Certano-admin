import React, { useState } from 'react';
import Card from '@/components/common/Card';
import { useResponsive } from '@/hooks/useResponsive';

// Plan badge component
const PlanBadge = ({ plan }) => {
  let colorClasses = '';
  
  switch (plan.toLowerCase()) {
    case 'premium':
      colorClasses = 'bg-red-900/30 text-red-400';
      break;
    case 'basic':
      colorClasses = 'bg-purple-900/30 text-purple-400';
      break;
    case 'enterprise':
      colorClasses = 'bg-gray-700/50 text-gray-300';
      break;
    default:
      colorClasses = 'bg-gray-700/30 text-gray-400';
  }
  
  return (
    <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
      {plan}
    </span>
  );
};

// Client avatar component
const ClientAvatar = ({ initials }) => (
  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-medium mr-3">
    {initials}
  </div>
);

// Mobile transaction card component
const MobileTransactionCard = ({ transaction }) => (
  <div className="p-4 border border-[#333] rounded-lg bg-[#1a1a1a] hover:bg-[#191919] transition-colors">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center">
        <ClientAvatar initials={transaction.initials} />
        <div>
          <h4 className="text-white font-medium text-sm">{transaction.client}</h4>
          <p className="text-xs text-gray-400">{transaction.email}</p>
        </div>
      </div>
      <span className="text-white font-medium text-sm">{transaction.amount}</span>
    </div>
    
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Date:</span>
        <span className="text-xs text-white">{transaction.date}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Plan:</span>
        <PlanBadge plan={transaction.plan} />
      </div>
      
      <div className="flex justify-between items-start">
        <span className="text-xs text-gray-400">Description:</span>
        <span className="text-xs text-white text-right flex-1 ml-2">{transaction.description}</span>
      </div>
    </div>
  </div>
);

// Complete transaction data from the image
const transactionData = [
  { date: "6/10/2024", client: "Mike Johnson", email: "mike@example.com", plan: "Enterprise", description: "Quarterly payment", amount: "$5,000", initials: "MJ" },
  { date: "6/10/2024", client: "Mike Johnson", email: "mike@example.com", plan: "Basic", description: "Project milestone", amount: "$5,000", initials: "MJ" },
  { date: "6/10/2024", client: "Mike Johnson", email: "mike@example.com", plan: "Premium", description: "Monthly subscription", amount: "$5,000", initials: "MJ" },
  { date: "6/10/2024", client: "Mike Johnson", email: "mike@example.com", plan: "Enterprise", description: "Quarterly payment", amount: "$5,000", initials: "MJ" },
  { date: "6/10/2024", client: "Mike Johnson", email: "mike@example.com", plan: "Basic", description: "Project milestone", amount: "$5,000", initials: "MJ" },
  { date: "6/10/2024", client: "Mike Johnson", email: "mike@example.com", plan: "Premium", description: "Monthly subscription", amount: "$5,000", initials: "MJ" },
  { date: "6/10/2024", client: "Mike Johnson", email: "mike@example.com", plan: "Enterprise", description: "Quarterly payment", amount: "$5,000", initials: "MJ" },
];

const TransactionsTable = () => {
  const { isMobile } = useResponsive();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Arbitrary number for demo
  
  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const renderPagination = () => {
    const getVisiblePages = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Calculate start and end based on current page
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;
        
        // Adjust if we're near the end
        if (end > totalPages) {
          end = totalPages;
          start = Math.max(1, end - maxVisible + 1);
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    };
    
    return (
      <div className="flex items-center justify-center space-x-2 mt-6">
        <button 
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded bg-[#333] hover:bg-[#444] disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {getVisiblePages().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-8 h-8 flex items-center justify-center rounded ${
              currentPage === pageNum 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:bg-[#333]'
            }`}
          >
            {pageNum}
          </button>
        ))}
        
        <button 
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded bg-[#333] hover:bg-[#444] disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="font-schibsted text-lg md:text-2xl text-white mb-3 md:mb-4">Recent Transactions</h3>
      {isMobile ? (
        <div className="space-y-3">
          {transactionData.map((transaction, index) => (
            <MobileTransactionCard key={index} transaction={transaction} />
          ))}
          {renderPagination()}
        </div>
      ) : (
        <Card className="w-full overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#333] bg-[#222]">
                  <th className="px-4 py-3 text-left text-sm text-gray-400">Date</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">Client</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">Description</th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.map((transaction, index) => (
                  <tr key={index} className="border-b border-[#333] hover:bg-[#191919] transition-colors">
                    <td className="px-4 py-4 text-white">{transaction.date}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <ClientAvatar initials={transaction.initials} />
                        <div>
                          <div className="text-white">{transaction.client}</div>
                          <div className="text-gray-400 text-sm">{transaction.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-white">{transaction.description}</td>
                    <td className="px-4 py-4 text-white">{transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination()}
        </Card>
      )}
    </div>
  );
};

export default TransactionsTable;
