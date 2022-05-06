import React, { useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider, useDispatch, useSelector } from "react-redux";

import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { store } from "../../services/index";
import { getIngredients } from "../../services/actions/ingredients-actions";
import { CLOSEMODAL } from "../../services/actions/modal-actions";

function App() {
  const dispatch = useDispatch();
  const { error, ingredientSelect } = useSelector(
    store => store.ingredientsState
  );
  const { modalIsOpen, modalMode } = useSelector(store => store.modalState);
  const { orderNumber } = useSelector(store => store.orderState);
  const fetchData = useCallback(async () => {
    await dispatch(getIngredients());
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Provider store={store}>
      <div className="App">
        {error ? (
          <div className="error-App">
            <p className="text text_type_main-large">
              Произошла ошибка, при получении данных
            </p>
          </div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <AppHeader />
            <Main />
          </DndProvider>
        )}
      </div>
      <Modal
        show={modalIsOpen && modalMode === "IngredientDetails"}
        onClose={() => dispatch({ type: CLOSEMODAL })}
      >
        <IngredientDetails item={ingredientSelect} />
      </Modal>
      <Modal
        show={modalIsOpen && modalMode === "orderDetails"}
        onClose={() => dispatch({ type: CLOSEMODAL })}
      >
        <OrderDetails item={orderNumber} />
      </Modal>
    </Provider>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
