import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import styles from "./BurgerIngredient.module.css";
const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});
BurgerIngredient.propTypes = {
  ingredient: ingredientType,
};
export default function BurgerIngredient({ ingredient }) {
  return (
    <div className={classNames(styles.burgerItem, "mb-8")}>
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
          <span className="text text_type_main-medium">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className="burgerTitle text text_type_main-default">
          {ingredient.name}
        </div>
      </div>
    </div>
  );
}