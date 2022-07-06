import React, { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ingredientType } from '../../types';
import styles from '../BurgerConstructor/BurgerConstructor.module.css';

interface IBurgerConstructorItem {
  children?: React.ReactNode;
  id: string;
  ingredientsIndex: number;
  findIngredient: any;
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
        const { index: droppedIndex } = findIngredient(id);
        if (!didDrop) {
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
    <div ref={(item) => drag(drop(item))} className={styles.burgerCard}>
      {children}
    </div>
  );
};

export default BurgerConstructorItem;
