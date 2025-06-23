import { useState } from "react";
import Card from "../common/Card";
import { formatDate } from "@/utils/helpers/formatters";

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
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-white/5 rounded-lg transition-all">
      <div className="flex items-center space-x-3">
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
        <div>
          <h4 className="text-white font-schibsted">{client.name}</h4>
          <p className="text-xs text-text-body">{client.email}</p>
        </div>
      </div>
      <div className="text-xs text-text-body">
        {formatDate(client.joinDate)}
      </div>
    </div>
  );
};

const RecentClients = () => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-schibsted text-lg text-white">
          Recent Joined Clients
        </h3>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="flex items-center text-sm text-text-body hover:text-white transition-all"
        >
          <img
            src="/Dashboard-assets/view.svg"
            alt="View all"
            className="w-4 h-4 mr-1"
          />
          <span>View All</span>
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
