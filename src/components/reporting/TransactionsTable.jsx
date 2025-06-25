import React, { useState } from 'react';
import Card from '@/components/common/Card';

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
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
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
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Arbitrary number for demo
  
  // Pagination controls
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const renderPagination = () => (
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
      
      {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
        // Show 5 page numbers centered around current page
        let pageNum = currentPage - 2 + idx;
        if (pageNum <= 0) pageNum = idx + 1;
        if (pageNum > totalPages) return null;
        
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-6 h-6 flex items-center justify-center rounded ${
              currentPage === pageNum 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:bg-[#333]'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
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

  return (
    <div className="mb-8">
      <h3 className="font-schibsted text-2xl text-white mb-4">Recent Transactions</h3>
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-[#333] bg-[#222]">
                <th className="px-4 py-3 text-left text-sm text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Client</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Plan</th>
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
                  <td className="px-4 py-4">
                    <PlanBadge plan={transaction.plan} />
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
    </div>
  );
};

export default TransactionsTable;
