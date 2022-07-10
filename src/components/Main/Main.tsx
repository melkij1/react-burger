import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
export default function Main() {
  const { setBun, setIngredient, removeBun } = useActions();
  const { ingredients } = useTypedSelector((state) => state.ingredientsState);
  const { burderConstructor } = useTypedSelector((state) => state.burgerState);
  const { bun } = burderConstructor;
  const handleDrop = (itemId: { uuid: string }) => {
    // console.log(itemId,'')
    console.log(itemId);
    const item = ingredients.find((x) => x._id === itemId.uuid);
    console.log(item, 'handleDrop');
    if (item) {
      if (bun.length === 1 && item.type === 'bun') {
        bun[0].__v = 0;
        removeBun();
      }
      item.__v = item.__v + 1;
      if (item.type === 'bun') {
        setBun(item);
      } else {
        setIngredient(item);
      }
    }
  };
  return (
    <div className="container mb-10">
      <h1 className="text text_type_main-large mt-10 mb-5 title">
        Соберите бургер
      </h1>
      <div className="row">
        <BurgerIngredients />
        <BurgerConstructor onDropHandler={handleDrop} />
      </div>
    </div>
  );
}
