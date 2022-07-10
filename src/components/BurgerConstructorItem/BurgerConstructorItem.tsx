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
  sortIngredient: (ingredientsIndex: string, droppedIndex: number) => void;
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
          sortIngredient(droppedId, originalIndex);
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
        console.log(draggedId, 'Id', uuid);
        if (draggedId !== uuid) {
          const { index: overIndex } = findIngredient(uuid);
          sortIngredient(draggedId, overIndex);
        }
      },
    }),
    [findIngredient, sortIngredient]
  );
  // const ref = useRef<HTMLLIElement | undefined>(null);
  // const [, drag] = useDrag(
  //   () => ({
  //     type: 'ingredients-sort',
  //     item: { id: id, ingredientsIndex },
  //     end: (item, monitor) => {
  //       const { id, ingredientsIndex } = item;
  //       const didDrop = monitor.didDrop();
  //       const { index: droppedIndex } = findIngredient(id);
  //       if (!didDrop) {
  //         sortIngredient(ingredientsIndex, droppedIndex);
  //       }
  //     },
  //   }),
  //   [id, ingredientsIndex, sortIngredient]
  // );

  // const [, drop] = useDrop(
  //   (): any => ({
  //     accept: 'ingredients-sort',
  //     canDrop: () => false,
  //     hover({ id: itemId }: any) {
  //       if (itemId !== id) {
  //         // console.log(item,'item')
  //         const { index: oldIndex } = findIngredient(id);
  //         const { index: itemIndex } = findIngredient(itemId);
  //         sortIngredient(itemIndex, oldIndex);
  //         // const sort = sortIngredient(itemIndex, oldIndex)
  //         // debounce(sortIngredient(itemIndex, oldIndex),500);
  //         // debounce(moveIngredient, 300), [innerOrder]);
  //       }
  //     },
  //   }),
  //   []
  // );
  // drag(drop(drop));
  // ref = (item) => drag(drop(item));
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={(item) => drag(drop(item))}
      className={styles.burgerCard}
      style={{ opacity }}
    >
      {/* <div ref={ref} className={styles.burgerCard}> */}
      {children}
    </div>
  );
};

export default BurgerConstructorItem;
