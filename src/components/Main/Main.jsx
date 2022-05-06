import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {
  SET_BUN,
  SET_INGREDIENT,
  REMOVE_BUN,
} from "../../services/actions/constructor-actions";
export default function Main() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state.ingredientsState);
  const { burderConstructor } = useSelector(state => state.burgerState);
  const { bun } = burderConstructor;
  const handleDrop = itemId => {
    const item = ingredients.find(x => x._id === itemId.id);
    if (item) {
      if (bun.length === 1 && item.type === "bun") {
        bun[0].__v = 0;
        dispatch({ type: REMOVE_BUN });
      } else {
        item.__v = item.__v + 1;
      }
      if (item.type === "bun") {
        dispatch({ type: SET_BUN, payload: item });
      } else {
        dispatch({ type: SET_INGREDIENT, payload: item });
      }
    }

    // dispatch(
    //   addIngredient(
    //     ingredients.find((ingredient) => ingredient._id === itemId.id)
    //   )
    // );
  };
  return (
    <div className="container mb-10">
      <h1 className="text text_type_main-large mt-10 mb-5 title">
        Соберите бургер
      </h1>
      <div className="row">
        {/* <DndProvider backend={HTML5Backend}> */}
        <BurgerIngredients />
        <BurgerConstructor onDropHandler={handleDrop} />
        {/* </DndProvider> */}
      </div>
    </div>
  );
}
