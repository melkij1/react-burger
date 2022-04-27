import React, { useContext } from "react";
import { AppContext } from "../../services/appContext";
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../Modal/modal.module.css";
import classNames from "classnames/bind";
import { ingredientType } from "../../types/index";
IngredientDetails.propTypes = {
  item: ingredientType,
};
export default function IngredientDetails({ item }) {
  const { state, dispatch } = useContext(AppContext);
  const { modalMode, burderConstructor } = state;
  const addItem = () => {
    item.__v = item.__v + 1;
    if (item.type === "bun") {
      dispatch({ type: "setBun", payload: item });
    } else {
      dispatch({ type: "setIngredient", payload: item });
    }
    dispatch({ type: "closeModal" });
  };

  const hasBunAdd =
    modalMode === "IngredientDetails" &&
    item.type === "bun" &&
    burderConstructor.bun.length > 0;

  return (
    <div
      className={classNames(styles.modalContent, styles.modalContentIngredient)}
    >
      <div className="modalHeader text text_type_main-large">
        Детали ингредиента
      </div>
      <div className={styles.modalContentWrap}>
        <div className="modalContentImg mb-4">
          <img src={item.image_large} alt="" />
        </div>
        <div
          className={classNames(
            styles.modalContentTitle,
            " text text_type_main-medium mb-8"
          )}
        >
          {item.name}
        </div>
        <div className={styles.modalContentItems}>
          <div className={classNames(styles.modalContentItem, "mr-5")}>
            <span className="text text_type_main-default">Калории,ккал</span>
            <div className={styles.value}>{item.calories}</div>
          </div>
          <div className={classNames(styles.modalContentItem, "mr-5")}>
            <span className="text text_type_main-default">Белки, г</span>
            <div className={styles.value}>{item.proteins}</div>
          </div>
          <div className={classNames(styles.modalContentItem, "mr-5")}>
            <span className="text text_type_main-default">Жиры, г</span>
            <div className={styles.value}>{item.fat}</div>
          </div>
          <div className={classNames(styles.modalContentItem)}>
            <span className="text text_type_main-default">Углеводы, г</span>
            <div className={styles.value}>{item.carbohydrates}</div>
          </div>
        </div>
        <div className={styles.modalContentBottom}>
          {/* TODO: Кнопка сделал специально для того чтобы,
          ревьюер мог наглядно посмотреть что добавление товара в конструктор работает */}
          {hasBunAdd ? (
            <p>Вы уже добавили булку</p>
          ) : (
            <Button type="primary" size="medium" onClick={addItem}>
              Добавить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
