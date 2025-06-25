import React from 'react';
import { Modal, ModalCloseButton } from '@/components/common/Modal';
import Button from '@/components/common/Button';

const ExportPDFModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const reportData = {
    date: "6/14/2025",
    records: 8,
    earnings: "$21,000"
  };

  // Table data matching the image
  const tableData = [
    { date: "6/10/2024", client: "TechCorp Inc", plan: "Premium", description: "Monthly subscription", amount: "$2,500" },
    { date: "6/5/2024", client: "StartupXYZ", plan: "Basic", description: "Project milestone", amount: "$1,200" },
    { date: "6/10/2024", client: "Enterprise Co", plan: "Enterprise", description: "Quarterly payment", amount: "$5,000" },
    { date: "5/15/2024", client: "TechCorp Inc", plan: "Premium", description: "Monthly subscription", amount: "$2,500" },
    { date: "5/20/2024", client: "Local Business", plan: "Basic", description: "Website maintenance", amount: "$800" },
    { date: "4/12/2024", client: "Enterprise Co", plan: "Enterprise", description: "Feature development", amount: "$5,000" },
    { date: "4/25/2024", client: "StartupXYZ", plan: "Pro", description: "Monthly subscription", amount: "$1,500" },
    { date: "3/8/2024", client: "TechCorp Inc", plan: "Premium", description: "Website maintenance", amount: "$2,500" },
  ];

  // Plan badge with appropriate styling
  const PlanBadge = ({ plan }) => {
    let bgColor = 'bg-gray-700';
    let textColor = 'text-gray-300';
    
    switch (plan.toLowerCase()) {
      case 'premium':
        bgColor = 'bg-red-900/30';
        textColor = 'text-red-400';
        break;
      case 'basic':
        bgColor = 'bg-purple-900/30';
        textColor = 'text-purple-400';
        break;
      case 'enterprise':
        bgColor = 'bg-gray-700/50';
        textColor = 'text-gray-300';
        break;
      case 'pro':
        bgColor = 'bg-green-900/30';
        textColor = 'text-green-400';
        break;
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${bgColor} ${textColor}`}>
        {plan}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="800px">
      <div className="relative">
        <ModalCloseButton onClose={onClose} />
        
        <h2 className="text-2xl font-schibsted font-bold text-white mb-6">Earnings Report</h2>
        
        {/* Report details */}
        <div className="bg-[#111] rounded-xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Report Generated:</p>
              <p className="text-white text-lg font-medium">{reportData.date}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Records:</p>
              <p className="text-white text-lg font-medium">{reportData.records}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Earnings:</p>
              <p className="text-white text-lg font-medium">{reportData.earnings}</p>
            </div>
          </div>
        </div>
        
        {/* Transactions table */}
        <div className="overflow-x-auto rounded-xl bg-[#111]">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="px-4 py-3 text-left text-sm text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Client</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Plan</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Description</th>
                <th className="px-4 py-3 text-left text-sm text-gray-400">Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border-b border-[#333]">
                  <td className="px-4 py-4 text-white">{item.date}</td>
                  <td className="px-4 py-4 text-white">{item.client}</td>
                  <td className="px-4 py-4">
                    <PlanBadge plan={item.plan} />
                  </td>
                  <td className="px-4 py-4 text-white">{item.description}</td>
                  <td className="px-4 py-4 text-white">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default ExportPDFModal;
