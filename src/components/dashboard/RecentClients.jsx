import { useState } from "react";
import Card from "../common/Card";
import { formatDate } from "@/utils/helpers/formatters";
import { useResponsive } from "@/hooks/useResponsive";
import viewIcon from "@/assets/icons/view.svg";
const mockClients = [
  {
    id: "sj1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    joinDate: "2023-01-11",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "sj2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    joinDate: "2023-01-11",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "sj3",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    joinDate: "2023-01-11",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "sj4",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    joinDate: "2023-01-11",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const ClientRow = ({ client }) => {
  const { isMobile } = useResponsive();
  
  return (
    <div className="flex items-center justify-between py-3 px-2 md:px-4 hover:bg-white/5 rounded-lg transition-all">
      <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-cards-alt-bg flex-shrink-0">
          {client.avatar ? (
            <img
              src={client.avatar}
              alt={client.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-heading font-bold">
              {client.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-white font-schibsted text-sm md:text-base truncate">{client.name}</h4>
          <p className="text-xs text-text-body truncate">{isMobile ? client.email.split('@')[0] : client.email}</p>
        </div>
      </div>
      <div className="text-xs text-text-body flex-shrink-0">
        {isMobile ? formatDate(client.joinDate).split(' ')[0] : formatDate(client.joinDate)}
      </div>
    </div>
  );
};

const RecentClients = () => {
  const { isMobile } = useResponsive();
  const [viewAll, setViewAll] = useState(false);

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-schibsted text-base md:text-lg text-white">
          Recent Joined Clients
        </h3>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="flex items-center text-xs md:text-sm text-text-body hover:text-white transition-all"
        >
          <img src={viewIcon} alt="View all" className="w-3 md:w-4 h-3 md:h-4 mr-1" />
          <span>{isMobile ? 'View' : 'View All'}</span>
        </button>
      </div>

      <div className="space-y-1">
        {mockClients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </div>
    </Card>
  );
};

export default RecentClients;
