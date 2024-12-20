import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
