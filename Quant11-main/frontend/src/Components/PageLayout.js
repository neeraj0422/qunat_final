import { useState } from 'react';
import { useLocation } from 'react-router';
import Header from './Common/Header/Header';
import Sidebar from './Sidebar/Sidebar';

export const PageLayout = ({ children }) => {
  const location = useLocation();

  const hideHeaderAndSidebarRoutes = ['/sign-up', '/sign-in'];

  const shouldHideHeaderAndSidebar = hideHeaderAndSidebarRoutes.includes(location.pathname);

  if (shouldHideHeaderAndSidebar) {
    return <>{children}</>;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const isResponsive = window.innerWidth < 991;
    if (isResponsive) {
      document.getElementById('sideMenuBar').style.width = isSidebarOpen ? '0px' : '290px';
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="main">
      <Header toggleSidebar={toggleSidebar} />
      <div className="layoutWrapper">
        {!shouldHideHeaderAndSidebar && (
          <div className="sidebarWrapper">
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
        )}
        <div className="mainWrapper">{children}</div>
      </div>
    </div>
  );
};
