import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import { ingredientType } from "../../types/index";
import { AppContext } from "../../services/appContext";
import styles from "./BurgerIngredient.module.css";
BurgerIngredient.propTypes = {
  ingredient: ingredientType,
};
export default function BurgerIngredient({ ingredient }) {
  const { dispatch } = useContext(AppContext);
  const openModal = () => {
    dispatch({ type: "setIngredietnSelect", payload: ingredient });
    dispatch({
      type: "openModal",
      payload: { modalIsOpen: true, mode: "IngredientDetails" },
    });
  };
  return (
    <>
      <div
        className={classNames(styles.burgerItem, "mb-8")}
        onClick={openModal}
      >
        <div className="pl-4 pr-4">
          {ingredient.__v > 0 && (
            <Counter
              count={ingredient.__v}
              size="default"
              className="burderCount"
            />
          )}

          <img src={ingredient.image} alt="" className="mb-1" />
          <div className={classNames(styles.burderItemPrice, "mb-1")}>
            <span className="text text_type_main-medium">
              {ingredient.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <div className="burgerTitle text text_type_main-default">
            {ingredient.name}
          </div>
        </div>
      </div>
    </>
  );
}
