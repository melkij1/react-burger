import React, { useMemo, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../Modal/modal.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  WS_CONNECTION_START,
  WS_USER_CONNECTION_START,
} from '../../services/actions/ws/types';
import { formatDate } from '../../helpers/time';

export const FeedDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const profileOrders = useRouteMatch('/profile/orders');
  const profileOrdersActive = profileOrders && profileOrders.isExact;
  const { modalIsOpen } = useTypedSelector((state) => state.modalState);
  const { orders, wsConnected, wsConnectedUser } = useTypedSelector(
    (store) => store.feedState
  );
  const { ingredients } = useTypedSelector((state) => state.ingredientsState);
  // const order = orders.find((order) => order._id === id);
  const order = useMemo(() => {
    if (orders.length) {
      return orders.find((order) => order._id === id);
    }
  }, [orders]);
  const findI = useMemo(() => {
    if (order) {
      return order.ingredients?.map((id: string) =>
        ingredients.find((ingredient) => ingredient._id === id)
      );
    }
  }, [order, ingredients]);

  const orderTotalPrice = useMemo(() => {
    if (findI && findI.length) {
      return findI.reduce((a, b) => a + b!.price, 0);
    }
  }, [findI, ingredients, wsConnected]);

  const getStatus = (status: string): string => {
    let text = '';

    switch (status) {
      case 'created':
        text = 'Создан';
        break;
      case 'pending':
        text = 'Готовится';
        break;
      case 'done':
        text = 'Выполнен';
        break;
      default:
    }

    return text;
  };

  useEffect(() => {
    if (!wsConnectedUser && profileOrdersActive) {
      dispatch({ type: WS_USER_CONNECTION_START });
    }
    if (!wsConnected && !profileOrdersActive) {
      dispatch({ type: WS_CONNECTION_START });
    }
  }, []);

  if (!order) {
    return <div className="">Загрузка...</div>;
  }
  return (
    <div
      className={classNames(
        styles.modalContent,
        styles.modalContentIngredient,
        !modalIsOpen ? styles.modalContentMargin : '',
        styles.modalFeed
      )}
    >
      <div className="modalHeader text text_type_digits-default mb-10">
        #{order.number}
      </div>
      <div className={styles.feed_modal_wrapper}>
        <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
        <p
          className={`text text_type_main-default mb-15 ${styles.status} ${
            order.status === 'done' ? styles.done : ''
          }`}
        >
          {getStatus(order.status)}
        </p>
        <h2 className="text text_type_main-medium mb-6 ">Состав:</h2>
        <div
          className={classNames(
            styles.ingredients_list,
            'mb-10 pr-6 customScroll'
          )}
        >
          {findI &&
            findI?.map((ingredient, idx) => (
              <div
                className={classNames(styles.ingredientListItem, 'mb-4')}
                key={`ingredientListItem${idx}_${ingredient?._id}`}
              >
                <div className={classNames(styles.feedItemIngredient, 'mr-4')}>
                  <img src={ingredient?.image} alt="" />
                </div>
                <div className="text text_type_main-default">
                  {ingredient?.name}
                </div>
                <div
                  className={classNames(styles.ingredientListItemCost, 'ml-4')}
                >
                  <p className="text text_type_digits-default">{`${ingredient?.__v}x${ingredient?.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
        </div>
        <div className={styles.ingredients_footer}>
          <p className="text text_type_main-default text_color_inactive">
            {formatDate(order.createdAt)}
          </p>
          <div className={styles.ingredient_cost}>
            <p className="text text_type_digits-default">{orderTotalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
