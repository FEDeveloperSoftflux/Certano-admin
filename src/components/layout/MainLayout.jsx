import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-primary-bg">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Header />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
