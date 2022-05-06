import { fetchPost } from "../../api/index";
import { OPENMODAL } from "./modal-actions";
import { CLEAR_INGREDIENTS_SELECTEDS } from "./ingredients-actions";
import { CLEAR_CONSTRUCTOR } from "./constructor-actions";
export const SET_ORDER = "SET_ORDER";
export const SET_LOADER = "SET_LOADER";

export const getOrder = ingredientsData => dispatch => {
  fetchPost("/orders", ingredientsData)
    .then(response => {
      dispatch({ type: SET_LOADER, payload: false });
      const { success, order } = response;
      if (success && order) {
        dispatch({ type: SET_ORDER, payload: order?.number });
        dispatch({
          type: OPENMODAL,
          payload: { modalIsOpen: true, mode: "orderDetails" },
        });
        dispatch({ type: CLEAR_CONSTRUCTOR });
        dispatch({ type: CLEAR_INGREDIENTS_SELECTEDS });
      }
    })
    .catch(err => {
      dispatch({ type: SET_LOADER, payload: false });
      console.error("Не получилось оформить заказ");
    });
};
