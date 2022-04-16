import React from "react";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredientSection.module.css";
import classNames from "classnames/bind";
function BurgerIngredientSection({ title, ingredients }) {
  return (
    <div className={classNames(styles.burgerIngredientSection, "mt-10")}>
      <div className="title text text_type_main-medium mb-6">{title}</div>
      {ingredients &&
        ingredients.map((ingredient, idx) => (
          <BurgerIngredient
            key={`${ingredient.id}_${idx}`}
            ingredient={ingredient}
          />
        ))}
    </div>
  );
}

export default BurgerIngredientSection;
