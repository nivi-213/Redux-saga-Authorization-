import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import '../App.css';

const Layout = () => {
  const location = useLocation();
  const backgroundRoutes = ["/", "/home", "/signup", "/login"];
  const isBackgroundRoute = backgroundRoutes.includes(location.pathname);

  return (
    <div className={isBackgroundRoute ? "background" : "no-background"}>
      <Outlet />
    </div>
  );
};

export default Layout;
