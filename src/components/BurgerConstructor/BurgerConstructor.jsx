import React, { useContext, useEffect } from "react";
import { AppContext } from "../../services/appContext";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import classNames from "classnames/bind";
import { fetchPost } from "../../api/index";
export default function BurgerCards() {
  const { state, dispatch } = useContext(AppContext);
  const { burderConstructor, totalPrice } = state;
  const { bun, ingredients } = burderConstructor;
  const bunItem = bun?.[0];
  useEffect(() => {
    const bunPrice = bun[0]?.price * 2 || 0;
    const ingredientsPrices = ingredients?.reduce(
      (acc, val) => acc + val.price,
      0
    );
    dispatch({ type: "setPrice", payload: bunPrice + ingredientsPrices });
  }, [bun, ingredients, dispatch]);

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

  const removeItem = (item, index) => {
    if (item.__v > 0) {
      item.__v = item.__v - 1;
    }
    dispatch({
      type: "removeIngredient",
      payload: index,
    });
  };

  const orderAdd = async () => {
    const bunId = bunItem._id;
    const ingredientsId = ingredients.map(x => x._id);
    const ingredientsData = [bunId, ...ingredientsId, bunId];
    const response = await fetchPost("/orders", ingredientsData);
    if (response) {
      if (response.success) {
        dispatch({ type: "setOrder", payload: response.order.number });
        dispatch({
          type: "openModal",
          payload: { modalIsOpen: true, mode: "orderDetails" },
        });
      }
    }
  };
  return (
    <>
      <div className="col">
        <div className={styles.burgerCards}>
          <div className={styles.BurgerConstructorsWrapper}>
            {bunItem && (
              <div className={classNames(styles.burgerCard, "pr-4")}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={handlerName(bunItem.name, "top")}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
                />
              </div>
            )}
            <div
              className={classNames(
                styles.burgerWrapper,
                "customScroll",
                "pr-2"
              )}
            >
              {ingredients &&
                ingredients.map((item, index) => {
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
                        handleClose={() => removeItem(item, index)}
                      />
                    </div>
                  );
                })}
            </div>
            {bunItem && (
              <div className={classNames(styles.burgerCard, "pr-4")}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={handlerName(bunItem.name, "bottom")}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
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
            <Button type="primary" size="medium" onClick={orderAdd}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
