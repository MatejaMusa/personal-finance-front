import React from 'react';
import { NavBar } from './nav/NavBar';
import { Outlet } from 'react-router-dom';

const LayoutWithNavbar = () => {
  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutWithNavbar;