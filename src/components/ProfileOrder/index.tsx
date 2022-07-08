import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import FeedItem from '../FeedItem';
export const ProfileOrder = () => {
  const { wsConnectionStart, wsConnectionStop } = useActions();
  const { orders } = useTypedSelector((store) => store.feedState);
  useEffect(() => {
    const token = Cookies.get('accessToken')?.split('Bearer ')[1];
    const url = `wss://norma.nomoreparties.space/orders?token=${token}`;
    wsConnectionStart(url);
  }, []);
  useEffect(() => {
    return () => {
      wsConnectionStop();
    };
  }, []);

  if (!orders.length) {
    return <div className="">Загрузка...</div>;
  }

  return (
    <div className="profileOrders pr-2 customScroll">
      {orders &&
        orders.map((order, idx) => (
          <FeedItem key={`${order._id}_${idx}`} order={order} />
        ))}
    </div>
  );
};
