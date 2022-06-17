import React from 'react';
import Sidebar from '../../components/Sidebar';
function Profile({children}) {
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
