import React from "react";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
export default function Main() {
  return (
    <div className="container mb-10">
      <h1 className="text text_type_main-large mt-10 mb-5 title">
        Соберите бургер
      </h1>
      <div className="row">
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}
