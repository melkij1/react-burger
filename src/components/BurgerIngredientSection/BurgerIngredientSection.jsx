import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import styles from "./BurgerIngredientSection.module.css";
import classNames from "classnames/bind";
import { ingredientType } from "../../types/index";

BurgerIngredientSection.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};
function BurgerIngredientSection({
  title,
  ingredients,
  bunsRef,
  saucesRef,
  mainsRef,
}) {
  const refs = () => {
    if (title === "Булки") {
      return bunsRef;
    } else if (title === "Соусы") {
      return saucesRef;
    } else {
      return mainsRef;
    }
  };

  return (
    <div
      className={classNames(styles.burgerIngredientSection, "mt-10")}
      ref={refs()}
    >
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
