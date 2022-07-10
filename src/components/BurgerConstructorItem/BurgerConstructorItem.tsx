import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import debounce from 'lodash.debounce';
import { ingredientType } from '../../types';
import styles from '../BurgerConstructor/BurgerConstructor.module.css';

interface IBurgerConstructorItem {
  children?: React.ReactNode;
  uuid: string;
  ingredientsIndex: number;
  findIngredient: (uuid: string) => {
    index: number;
    findItem: ingredientType;
  };
  sortIngredient: (ingredientsIndex: number, droppedIndex: number) => void;
}

const BurgerConstructorItem: FC<IBurgerConstructorItem> = ({
  children,
  uuid,
  ingredientsIndex,
  findIngredient,
  sortIngredient,
}) => {
  const originalIndex = findIngredient(uuid).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'ingredients-sort',
      item: { uuid, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uuid: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          const drooppedIndex = findIngredient(droppedId).index;
          sortIngredient(drooppedIndex, originalIndex);
        }
      },
    }),
    [uuid, originalIndex, sortIngredient]
  );
  const [, drop] = useDrop(
    () => ({
      accept: 'ingredients-sort',
      hover(ingredient: ingredientType) {
        const { uuid: draggedId } = ingredient;

        if (draggedId !== uuid) {
          const { index: overIndex } = findIngredient(uuid);
          const draggedIndex = findIngredient(draggedId).index;
          sortIngredient(draggedIndex, overIndex);
        }
      },
    }),
    [findIngredient, sortIngredient]
  );

  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={(item) => drag(drop(item))}
      className={styles.burgerCard}
      style={{ opacity }}
    >
      {children}
    </div>
  );
};

export default BurgerConstructorItem;
