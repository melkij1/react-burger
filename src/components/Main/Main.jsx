import React from "react";
import PropTypes from "prop-types";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { ingredientType } from "../../types/index";
Main.propTypes = {
  items: PropTypes.arrayOf(ingredientType).isRequired,
  orders: PropTypes.arrayOf(ingredientType).isRequired,
};
export default function Main({ items, orders }) {
  return (
    <div className="container mb-10">
      <h1 className="text text_type_main-large mt-10 mb-5 title">
        Соберите бургер
      </h1>
      <div className="row">
        <BurgerIngredients items={items} />
        <BurgerConstructor orders={orders} />
      </div>
    </div>
  );
}
