import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { WS_USER_CONNECTION_START } from '../../services/actions/ws/types';
import FeedItem from '../FeedItem';
export const ProfileOrder = () => {
  const dispatch = useDispatch();
  const { orders, totalUser, totalTodayUser } = useTypedSelector(
    (store) => store.feedState
  );
  useEffect(() => {
    dispatch({ type: WS_USER_CONNECTION_START });
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
