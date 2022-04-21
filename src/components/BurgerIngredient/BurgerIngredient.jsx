import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames/bind";
import { ingredientType } from "../../types/index";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from "./BurgerIngredient.module.css";
BurgerIngredient.propTypes = {
  ingredient: ingredientType,
};
export default function BurgerIngredient({ ingredient }) {
  const [show, setShow] = useState(false);

  const openModal = e => {
    setShow(true);
  };
  return (
    <>
      <div
        className={classNames(styles.burgerItem, "mb-8")}
        onClick={openModal}
      >
        <div className="pl-4 pr-4">
          <Counter count={1} size="default" className="burderCount" />

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
      <Modal show={show} onClose={() => setShow(false)}>
        <IngredientDetails item={ingredient} />
      </Modal>
    </>
  );
}
