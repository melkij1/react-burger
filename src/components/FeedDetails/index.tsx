import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../Modal/modal.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../types';

export const FeedDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { modalIsOpen } = useTypedSelector((state) => state.modalState);
  const { orders } = useTypedSelector((store) => store.feedState);
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
    console.log(findI, 'iii');
    if (findI !== undefined) {
      return findI?.reduce((sum, item) => sum + item?.price * item?.__v, 0);
    } else {
      return 0;
    }
  }, [findI, ingredients]);

  if (!order) {
    return null;
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
          {order.status}
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
                className={styles.ingredientListItem}
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
          {/* <p className="text text_type_main-default text_color_inactive">{`${formatDistanceDayToNow(
                createdAt
              // )}, ${format(createdAt, "HH:mm 'i-'z")}`}</p> */}
          <div className={styles.ingredient_cost}>
            <p className="text text_type_digits-default">{orderTotalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
