import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import AnnounceIcon from "@/assets/icons/announce.svg";
import LearnIcon from "@/assets/icons/learn.svg";

const AnnouncementCard = ({ title, description, date, onEdit, isAdmin = false }) => {
  const { isMobile } = useResponsive();
  
  return (
    <div className="border-b border-[#333] pb-4 md:pb-6 last:border-0 last:pb-0">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="mt-1 flex-shrink-0">
          <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
            <img src={AnnounceIcon} alt="Announcement" className="w-4 md:w-5 h-4 md:h-5 brightness-0 invert" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="text-lg md:text-xl font-bold text-white pr-2">{title}</h3>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <span className="text-xs md:text-sm text-gray-400 flex items-center whitespace-nowrap">
                <svg className="w-3 md:w-4 h-3 md:h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {isMobile ? date.split(' ')[0] : date}
              </span>
              {isAdmin && (
                <button
                  onClick={onEdit}
                  className="flex items-center px-2 py-1 bg-gradient-primary hover:opacity-90 text-black text-xs rounded-md transition-all"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 mb-3 text-sm md:text-base leading-relaxed">{description}</p>
          
          <button className="text-sm text-[#9d3fff] hover:text-[#b16fff] transition-colors flex items-center">
            <span className="mr-1">Learn more</span>
            <img src={LearnIcon} alt="Learn More" className="w-3 md:w-4 h-3 md:h-4 brightness-0 invert" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
