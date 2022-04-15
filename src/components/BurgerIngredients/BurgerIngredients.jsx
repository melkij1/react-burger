import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientSection from "../BurgerIngredientSection/BurgerIngredientSection";
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
