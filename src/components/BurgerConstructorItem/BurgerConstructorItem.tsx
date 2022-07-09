import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ingredientType } from '../../types';
import styles from '../BurgerConstructor/BurgerConstructor.module.css';

interface IBurgerConstructorItem {
  children?: React.ReactNode;
  id: string;
  ingredientsIndex: number;
  findIngredient: (id: string) => {
    index: number;
    findItem: ingredientType;
  };
  sortIngredient: (ingredientsIndex: number, droppedIndex: number) => void;
}

const BurgerConstructorItem: FC<IBurgerConstructorItem> = ({
  children,
  id,
  ingredientsIndex,
  findIngredient,
  sortIngredient,
}) => {
  const [, drag] = useDrag(
    () => ({
      type: 'ingredients-sort',
      item: { id: id, ingredientsIndex },
      end: (item, monitor) => {
        const { id, ingredientsIndex } = item;
        const didDrop = monitor.didDrop();
        // const { index: droppedIndex } = findIngredient(id);
        const dropped = findIngredient(id);
        if (!didDrop && dropped) {
          const { index: droppedIndex } = dropped;
          sortIngredient(ingredientsIndex, droppedIndex);
        }
      },
    }),
    [id, ingredientsIndex, sortIngredient]
  );

  const [, drop] = useDrop(
    (): any => ({
      accept: 'ingredients-sort',
      canDrop: () => false,
      hover({ id: itemId }: any) {
        if (itemId === id) {
          return;
        }
        if (itemId !== id) {
          // const { index: oldIndex } = findIngredient(id);
          // const { index: itemIndex } = findIngredient(itemId);
          const old = findIngredient(id);
          const item = findIngredient(itemId);
          if (old && item) {
            const { index: oldIndex } = old;
            const { index: itemIndex } = item;
            setImmediate(() => {
              sortIngredient(itemIndex, oldIndex);
            });
            // sortIngredient(itemIndex, oldIndex);
          }
        }
      },
    }),
    []
  );
  return (
    <div ref={(item) => drag(drop(item))} className={styles.burgerCard}>
      {children}
    </div>
  );
};

export default BurgerConstructorItem;
