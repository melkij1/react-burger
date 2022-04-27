import React from "react";
import { useEffect, useCallback, useReducer } from "react";
import { AppContext } from "../../services/appContext";
import { appReducer } from "../../services/appReduces";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { fetchRequest } from "../../api/index";

const initialState = {
  ingredients: [],
  ingredientSelect: {},
  error: false,
  modalMode: "",
  modalIsOpen: false,
  burderConstructor: {
    bun: [],
    ingredients: [],
  },
  totalPrice: 0,
  orderNumber: 0,
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState, undefined);
  const fetchData = useCallback(async () => {
    const res = await fetchRequest("/ingredients");
    if (res && res.data) {
      dispatch({ type: "setIngredietns", payload: res.data });
    } else {
      dispatch({ type: "setError", payload: true });
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <AppContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <div className="App">
          {state.error ? (
            <div className="error-App">
              <p className="text text_type_main-large">
                Произошла ошибка, при получении данных
              </p>
            </div>
          ) : (
            <>
              <AppHeader />
              <Main />
            </>
          )}
        </div>
        <Modal
          show={state.modalIsOpen && state.modalMode === "IngredientDetails"}
          onClose={() => dispatch({ type: "closeModal" })}
        >
          <IngredientDetails item={state.ingredientSelect} />
        </Modal>
        <Modal
          show={state.modalIsOpen && state.modalMode === "orderDetails"}
          onClose={() => dispatch({ type: "closeModal" })}
        >
          <OrderDetails item={state.orderNumber} />
        </Modal>
      </AppContext.Provider>
    </>
  );
}

export default App;
