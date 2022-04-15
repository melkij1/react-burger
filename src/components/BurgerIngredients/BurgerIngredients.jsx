import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientSection from "../BurgerIngredientSection/BurgerIngredientSection";

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
BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(ingredientType).isRequired,
};
function BurgerIngredients({ items }) {
  const ingredientTypeTitles = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const [current, setCurrent] = useState("bun");
  const sortItems = items.sort((a, b) => {
    if (a.type === "bun" && b.type !== "bun") {
      return -1;
    } else if (a.type === "sauce" && b.type !== "sauce") {
      return -1;
    }
  });
  const typesIngredient = new Object();

  sortItems.forEach(item => {
    const { type } = item;
    if (!typesIngredient[type]) {
      typesIngredient[type] = [];
    }
    typesIngredient[type].push(item);
  });
  return (
    <div className="col">
      <div style={{ display: "flex" }}>
        {ingredientTypeTitles &&
          Object.keys(ingredientTypeTitles).map(type => (
            <Tab
              key={type}
              active={current === type}
              onClick={setCurrent}
              value={type}
            >
              {ingredientTypeTitles[type]}
            </Tab>
          ))}
      </div>
      <div className={classNames(styles.burgerItems, "customScroll")}>
        {typesIngredient &&
          Object.keys(typesIngredient).map((ingredient, index) => (
            <BurgerIngredientSection
              key={`${ingredient}_${index}`}
              title={ingredientTypeTitles[ingredient]}
              ingredients={typesIngredient[ingredient]}
            />
          ))}
      </div>
    </div>
  );
}

export default BurgerIngredients;
