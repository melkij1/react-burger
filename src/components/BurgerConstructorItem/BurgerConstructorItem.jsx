import React from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
function BurgerConstructorItem({
  children,
  id,
  ingredientsIndex,
  findIngredient,
  sortIngredient,
}) {
  const [, drag] = useDrag(
    () => ({
      type: "ingredients-sort",
      item: { id: id, ingredientsIndex },
      end: (item, monitor) => {
        const { id, ingredientsIndex } = item;
        const didDrop = monitor.didDrop();
        const { index: droppedIndex } = findIngredient(id);
        if (!didDrop) {
          sortIngredient(ingredientsIndex, droppedIndex);
        }
      },
    }),
    [id, ingredientsIndex, sortIngredient]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "ingredients-sort",
      canDrop: () => false,
      hover({ id: itemId }) {
        if (itemId !== id) {
          const { index: oldIndex } = findIngredient(id);
          const { index: itemIndex } = findIngredient(itemId);
          sortIngredient(itemIndex, oldIndex);
        }
      },
    }),
    []
  );
  return (
    <div ref={item => drag(drop(item))} className={styles.burgerCard}>
      {children}
    </div>
  );
}
BurgerConstructorItem.propsTypes = {
  children: PropTypes.node.isRequired,
  toppingId: PropTypes.number.isRequired,
  toppingIndex: PropTypes.number.isRequired,
  findTopping: PropTypes.func.isRequired,
  moveTopping: PropTypes.func.isRequired,
};
export default BurgerConstructorItem;
