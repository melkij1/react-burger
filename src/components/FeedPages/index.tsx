import React, { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './style.module.css';
import FeedItem from '../FeedItem';
import { FeedTotal } from '../FeedTotal';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_START } from '../../services/actions/ws/types';
const FeedPages = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useTypedSelector(
    (store) => store.feedState
  );
  console.log(orders, 'orders');
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
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
        <div className={styles.feedItemsWrap}>
          {orders &&
            orders.map((order, idx) => (
              <FeedItem key={`${order._id}_${idx}`} order={order} />
            ))}
        </div>
        <FeedTotal orders={orders} total={total} totalToday={totalToday} />
        {/* <BurgerIngredients />
        <BurgerConstructor onDropHandler={handleDrop} /> */}
      </div>
    </div>
  );
};

export default FeedPages;
