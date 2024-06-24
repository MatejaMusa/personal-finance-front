import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutWithoutNavbar= () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LayoutWithoutNavbar;