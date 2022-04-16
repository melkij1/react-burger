import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { orderType } from "../../types/index";
import classNames from "classnames/bind";

BurgerCards.propTypes = {
  orders: PropTypes.arrayOf(orderType).isRequired,
};

export default function BurgerCards({ orders }) {
  const totalPrice = orders.reduce((acc, val) => acc + val.price, 0);

  const handlerName = (name, type) => {
    if (type) {
      if (type === "top") {
        return `${name} (верх)`;
      } else {
        return `${name} (низ)`;
      }
    }
    return name;
  };

  const firstBul = orders[0];
  const lastBul = orders[orders.length - 1];
  const otherBul = orders.filter((x, i) => i > 0 && i < orders.length - 1);
  return (
    <div className="col">
      <div className={styles.burgerCards}>
        <div className={styles.BurgerConstructorsWrapper}>
          {firstBul && (
            <div className={classNames(styles.burgerCard, "pr-4")}>
              <ConstructorElement
                type={firstBul.position}
                isLocked={firstBul.locker}
                text={handlerName(firstBul.name, firstBul.position)}
                price={firstBul.price}
                thumbnail={firstBul.image}
              />
            </div>
          )}
          <div
            className={classNames(styles.burgerWrapper, "customScroll", "pr-2")}
          >
            {otherBul &&
              otherBul.map((item, index) => {
                return (
                  <div
                    className={styles.burgerCard}
                    key={`${item._id}_${index}`}
                  >
                    <div className={styles.burderCardIcon}>
                      <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                      type={item.position}
                      isLocked={item.locker}
                      text={handlerName(item.name, item.position)}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })}
          </div>
          {lastBul && (
            <div className={classNames(styles.burgerCard, "pr-4")}>
              <ConstructorElement
                type={lastBul.position}
                isLocked={lastBul.locker}
                text={handlerName(lastBul.name, lastBul.position)}
                price={lastBul.price}
                thumbnail={lastBul.image}
              />
            </div>
          )}
        </div>
      </div>
      <div className={classNames(styles.burgerTotalPrice, "mt-10 mr-4")}>
        <div
          className={classNames(
            styles.price,
            "text text_type_digits-medium mr-10"
          )}
        >
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className="button">
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}
