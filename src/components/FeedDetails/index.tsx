import React, { useMemo, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../Modal/modal.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDate } from '../../helpers/time';
import { ingredientType, Order } from '../../types';
import { useActions } from '../../hooks/useActions';
import Cookies from 'js-cookie';

export const FeedDetails = () => {
  const { wsConnectionStart, wsConnectionStop } = useActions();
  const { id } = useParams<{ id: string }>();
  const profileOrders = useRouteMatch('/profile/orders/:id');
  const profileOrdersActive = profileOrders && profileOrders.isExact;
  const { modalIsOpen } = useTypedSelector((state) => state.modalState);
  const { orders, wsConnected } = useTypedSelector((store) => store.feedState);
  const { ingredients } = useTypedSelector((state) => state.ingredientsState);
  const order = useMemo(() => {
    if (orders.length) {
      return orders.find((order) => order._id === id);
    }
  }, [orders]);
  const findI = useMemo(() => {
    if (order) {
      const ingredientsArray: ingredientType[] = [];
      const arr = order.ingredients?.map((id: string) =>
        ingredients.find((ingredient) => ingredient._id === id)
      );
      arr.forEach((x) => {
        const find: boolean = ingredientsArray.some(
          (ing) => ing._id === x!._id
        );
        if (find) {
          const findElement = ingredientsArray.find(
            (ing) => ing._id === x!._id
          );
          if (findElement) {
            if (findElement.type === 'bun' && findElement.__v < 2) {
              findElement.__v = findElement.__v + 1;
            }
          }
          return;
        } else {
          if (x) {
            // x.__v = x.__v + 1;
            if (x.__v === 0) {
              x.__v = x.__v + 1;
            }
            ingredientsArray.push(x);
          }
        }
      });

      return ingredientsArray;
    }
  }, [orders, order, ingredients]);

  const orderTotalPrice = useMemo(() => {
    if (findI && findI.length) {
      return findI.reduce((a, b) => {
        if (b.__v !== 0) {
          return a + b!.price * b!.__v;
        } else {
          return a + b!.price;
        }
      }, 0);
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
    if (!wsConnected && profileOrdersActive) {
      const token = Cookies.get('accessToken')?.split('Bearer ')[1];
      const url = `wss://norma.nomoreparties.space/orders?token=${token}`;
      wsConnectionStart(url);
    }
    if (!wsConnected && !profileOrdersActive) {
      wsConnectionStart('wss://norma.nomoreparties.space/orders/all');
    }
  }, []);
  useEffect(() => {
    return () => {
      wsConnectionStop();
      // dispatch({ type: WS_CONNECTION_START });
    };
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
