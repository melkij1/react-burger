import React from 'react';

import classNames from 'classnames/bind';
import IconSuccess from '../Icons/IconSuccess';
import styles from './orderDetails.module.css';
interface IOrderDetails {
  item: number;
}
function OrderDetails({ item }: IOrderDetails) {
  return (
    <div className={styles.modalContent}>
      <div
        className={classNames(
          styles.modalOrderTitle,
          ' pt-15 text text_type_digits-large mb-8'
        )}
      >
        {item}
      </div>
      <div className="modalOrderContent">
        <div className="modalOrderContent-indeti text text_type_main-medium mb-15">
          идентификатор заказа
        </div>
        <div className="modalOrderContentIcon mb-15">
          <IconSuccess />
        </div>
        <div className="modalOrderContentDescription">
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <span
            className={classNames(
              styles.textDark,
              'text text_type_main-default'
            )}
          >
            Дождитесь готовности на орбитальной станции
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
