import React from "react";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import { ingredientType } from "../../types/index";
import { INGREDIENTS_SELECTED } from "../../services/actions/ingredients-actions";
import { OPENMODAL } from "../../services/actions/modal-actions";
import styles from "./BurgerIngredient.module.css";
BurgerIngredient.propTypes = {
  ingredient: ingredientType,
};
export default function BurgerIngredient({ ingredient }) {
  const dispatch = useDispatch();
  const [{ opacity }, dragIngredient] = useDrag({
    type: "ingredient-card",
    item: { id: ingredient._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const openModal = () => {
    dispatch({ type: INGREDIENTS_SELECTED, payload: ingredient });
    dispatch({
      type: OPENMODAL,
      payload: { modalIsOpen: true, mode: "IngredientDetails" },
    });
  };
  return (
    <>
      <div
        className={classNames(styles.burgerItem, "mb-8")}
        onClick={openModal}
        ref={dragIngredient}
        styles={{ opacity }}
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
