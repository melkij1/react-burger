import React from 'react';
import { useRouteMatch } from 'react-router';
import cs from 'classnames';
import Sidebar from '../../components/Sidebar';

export interface LayoutProps {
  children?: React.ReactNode;
}

function Profile({ children }: LayoutProps) {
  const profileOrders = useRouteMatch('/profile/orders');
  const profileOrdersActive = profileOrders && profileOrders.isExact;
  return (
    <div className="container">
      <div
        className={cs(
          'lk-wrapper profile-wrapper',
          profileOrdersActive ? 'profile-orders' : ''
        )}
      >
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
export default Profile;
