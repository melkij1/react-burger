import React, { useEffect } from 'react';
import cs from 'classnames';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './style.module.css';
import FeedItem from '../FeedItem';
import { FeedTotal } from '../FeedTotal';
import { useActions } from '../../hooks/useActions';

const FeedPages = () => {
  const { wsConnectionStart, wsConnectionStop } = useActions();
  const { orders, total, totalToday } = useTypedSelector(
    (store) => store.feedState
  );
  useEffect(() => {
    wsConnectionStart('wss://norma.nomoreparties.space/orders/all');
  }, []);

  useEffect(() => {
    return () => {
      wsConnectionStop();
    };
  }, []);

  if (!orders.length) {
    return <div className={styles.feedLoader}>Загрузка...</div>;
  }
  return (
    <div className="container">
      <h1 className="text text_type_main-large mt-10 mb-5 title">
        Лента заказов
      </h1>
      <div className="row">
        <div className={cs(styles.feedItemsWrap, 'customScroll')}>
          {orders &&
            orders.map((order, idx) => (
              <FeedItem key={`${order._id}_${idx}`} order={order} />
            ))}
        </div>
        <FeedTotal orders={orders} total={total} totalToday={totalToday} />
      </div>
    </div>
  );
};

export default FeedPages;
