import React from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerCards from "../BurgerCards/BurgerCards";
export default function Main({ items }) {
  return (
    <div className="container mb-10">
      <h1 className="text text_type_digits-medium mt-10 mb-5 title">
        Соберите бургер
      </h1>
      <div className="row">
        <BurgerIngredients items={items} />
        <BurgerCards />
      </div>
    </div>
  );
}
