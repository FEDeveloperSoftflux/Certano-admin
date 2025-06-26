import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import AnnounceIcon from "@/assets/icons/announce.svg";
import AddIcon from "@/assets/icons/add.svg";
import AnnouncementCard from "@/components/whatsNew/AnnouncementCard";
import CreatePostModal from "@/components/whatsNew/CreatePostModal";
import EditUpdateModal from "@/components/common/EditUpdateModal";

const WhatsNew = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([

    {
      id: 1,
      title: "New EPC Standards from 2025",
      description: "All new tenancies will soon require a minimum EPC rating of C. Certano will notify you if your tenancy is at risk of failing short.",
      date: "11 Jan 2025"
    },
    {
      id: 2,
      title: "EPC Assessment Changes",
      description: "Updated guidelines for EPC assessments now include additional criteria for older properties. Review your portfolio for compliance.",
      date: "11 Jan 2025"
    },
    {
      id: 3,
      title: "Retrofit Funding Available",
      description: "Government grants now available for energy efficiency improvements to help meet new EPC requirements.",
      date: "9 Jan 2025"
    },
    {
      id: 4,
      title: "EPC Database Updates",
      description: "The national EPC database has been updated with new search functionality and improved accuracy.",
      date: "9 Jan 2025"
    },
    {
      id: 5,
      title: "New EPC Standards from 2025",
      description: "All new tenancies will soon require a minimum EPC rating of C. Certano will notify you if your tenancy is at risk of failing short.",
      date: "8 Jan 2025"
    }
  ]);

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedData) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === editingAnnouncement.id 
        ? { ...ann, ...updatedData }
        : ann
    ));
    setIsEditModalOpen(false);
    setEditingAnnouncement(null);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-schibsted font-bold text-white mb-1">
            What's New?
          </h1>
          <p className="text-text-body">
            Stay ahead of legal changes with <span className="text-orange-500">real-time compliance updates</span>
          </p>
        </div>
        <Button
          variant="primary"
          className="px-4 py-2 bg-gradient-primary shadow-sm transform hover:scale-105 transition-all"
          onClick={() => setIsCreatePostModalOpen(true)}
        >
          <span className="flex items-center text-black font-semibold">
            <img src={AddIcon} alt="Add" className="w-4 h-4 mr-2" />
            Create Post
          </span>
        </Button>
      </div>
      <Card className="w-full bg-[#1a1a1a] shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#7c11ff]/5 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#FF8067]/5 to-transparent rounded-full"></div>
        <div className="space-y-6 relative">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              description={announcement.description}
              date={announcement.date}
              isAdmin={true}
              onEdit={() => handleEdit(announcement)}
            />
          ))}
        </div>
      </Card>

      <CreatePostModal 
        isOpen={isCreatePostModalOpen} 
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={() => {
          // Handle post creation
          setIsCreatePostModalOpen(false);
        }}
      />
      
      <EditUpdateModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAnnouncement(null);
        }}
        onSubmit={handleEditSubmit}
        initialData={editingAnnouncement}
      />
    </div>
  );
};

export default WhatsNew;
