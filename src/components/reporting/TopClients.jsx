import React from 'react';
import Card from '@/components/common/Card';
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

const TopClients = () => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-schibsted text-2xl text-white">Top Clients</h3>
      <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        <span>View All</span>
      </button>
    </div>
    <Card className="w-full">
      <ul className="divide-y divide-[#333]">
        {clientsData.map((client, index) => (
          <li key={index} className="flex justify-between items-center py-4 px-4 hover:bg-[#191919] transition-colors">
            <div className="flex items-center">
              <ClientAvatar initials={client.initials} />
              <div>
                <h4 className="text-white font-medium">{client.name}</h4>
                <p className="text-xs text-gray-400">{client.email}</p>
              </div>
            </div>
            <span className="text-white font-medium">{client.amount}</span>
          </li>
        ))}
      </ul>
    </Card>
  </div>
);

export default TopClients;
