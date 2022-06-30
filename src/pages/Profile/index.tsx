import React from 'react';
import Sidebar from '../../components/Sidebar';

export interface LayoutProps {
  children?: React.ReactNode;
}

function Profile({ children }: LayoutProps) {
  return (
    <div className="container">
      <div className="lk-wrapper profile-wrapper">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
export default Profile;
