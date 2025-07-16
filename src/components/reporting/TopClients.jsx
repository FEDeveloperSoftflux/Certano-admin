import React from 'react';
import Card from '@/components/common/Card';
import { useResponsive } from '@/hooks/useResponsive';
import viewIcon from '@/assets/icons/view.svg';

// Sample top clients list
const clientsData = [
  { name: "Sarah Johnson", email: "sarah.j@example.com", amount: "$10,000", initials: "SJ" },
  { name: "Sarah Johnson", email: "sarah.j@example.com", amount: "$7,500", initials: "SJ" },
  { name: "Sarah Johnson", email: "sarah.j@example.com", amount: "$3,600", initials: "SJ" },
  { name: "Sarah Johnson", email: "sarah.j@example.com", amount: "$800", initials: "SJ" },
];

// Client avatar component
const ClientAvatar = ({ initials }) => (
  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-medium mr-3">
    {initials}
  </div>
);

const TopClients = () => {
  const { isMobile } = useResponsive();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h3 className="font-schibsted text-lg md:text-2xl text-white">Top Clients</h3>
        <button className="flex items-center text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
          <span>{isMobile ? 'View' : 'View All'}</span>
        </button>
      </div>
      <Card className="w-full">
        <ul className="divide-y divide-[#333]">
          {clientsData.map((client, index) => (
            <li key={index} className="flex justify-between items-center py-3 md:py-4 px-3 md:px-4 hover:bg-[#191919] transition-colors">
              <div className="flex items-center min-w-0 flex-1">
                <ClientAvatar initials={client.initials} />
                <div className="min-w-0 flex-1">
                  <h4 className="text-white font-medium text-sm md:text-base truncate">{client.name}</h4>
                  <p className="text-xs text-gray-400 truncate">
                    {isMobile ? client.email.split('@')[0] : client.email}
                  </p>
                </div>
              </div>
              <span className="text-white font-medium text-sm md:text-base flex-shrink-0">
                {client.amount}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default TopClients;
