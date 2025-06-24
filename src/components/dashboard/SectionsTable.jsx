import { useState } from "react";
import Card from "../common/Card";
import updateIcon from "../../assets/icons/update.svg";
import SectionsView from "./SectionsView";
import viewIcon from "@/assets/icons/view.svg";

const mockSections = [
  {
    id: "01",
    title: "Advanced React Patterns",
    category: "Development",
    hasNotification: true,
  },
  {
    id: "02",
    title: "Advanced React Patterns",
    category: "Development",
    hasNotification: false,
  },
  {
    id: "03",
    title: "Advanced React Patterns",
    category: "Development",
    hasNotification: false,
  },
];

const SectionRow = ({ section }) => {
  return (
    <div className="flex items-center py-4 px-4 hover:bg-white/5 rounded-lg transition-all">
      <div className="w-8 h-8 rounded-full bg-cards-alt-bg flex items-center justify-center mr-4 text-sm text-white font-schibsted">
        {section.id}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <h4 className="text-white font-schibsted">{section.title}</h4>
          {section.hasNotification && (
            <div className="ml-3">
              <img src={updateIcon} alt="Update needed" className="w-4 h-4" />
            </div>
          )}
        </div>
        <p className="text-xs text-text-body">{section.category}</p>
      </div>
    </div>
  );
};

const SectionsTable = () => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-schibsted text-lg text-white">
          Sections That Need Updating
        </h3>
        <button
          onClick={() => setViewAll(!viewAll)}
          className={`flex items-center text-sm ${
            viewAll ? "text-white" : "text-text-body hover:text-white"
          } transition-all`}
        >
          <img src={viewIcon} alt="View all" className="w-4 h-4 mr-1" />
          <span>{viewAll ? "View Less" : "View All"}</span>
        </button>
      </div>

      {viewAll ? (
        <SectionsView />
      ) : (
        <div className="space-y-1">
          {mockSections.map((section, index) => (
            <SectionRow key={section.id} section={section} index={index} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default SectionsTable;
