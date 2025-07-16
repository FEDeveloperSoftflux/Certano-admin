import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';

const MainLayoutContent = () => {
  const { isSidebarOpen, isMobile, closeSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen bg-primary-bg relative">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Backdrop overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}
      
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <Header />
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const MainLayout = () => {
  return (
    <SidebarProvider>
      <MainLayoutContent />
    </SidebarProvider>
  );
};

export default MainLayout;
