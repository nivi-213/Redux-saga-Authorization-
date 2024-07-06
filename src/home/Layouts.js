import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import '../App.css';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';

const Layout = () => {
  const location = useLocation();
  const backgroundRoutes = ["/", "/home", "/signup", "/login"];
  const sidebarRoutes = ["/usertable", "/admintable"];
  const isBackgroundRoute = backgroundRoutes.includes(location.pathname);
  const isSidebarRoute = sidebarRoutes.includes(location.pathname);

  return (
    <div className={isBackgroundRoute ? "background" : "no-background"}>
      {isSidebarRoute && (
        <>
          <div className='headernav'>
          <Header /> 
        </div>
        <div className="sidenav">
        
          <Sidebar />
          </div>
          </>
      )}
      <div className={isSidebarRoute ? "main-content" : "full-content"}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
