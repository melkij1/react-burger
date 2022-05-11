import { fetchPost } from "../../../api/index";
import { SET_ORDER, SET_LOADER } from "./types";
import { OPENMODAL } from "../modal/types";
import { CLEAR_INGREDIENTS_SELECTEDS } from "../ingredients/types";
import { CLEAR_CONSTRUCTOR } from "../constructor/types";
export const OrderActionCreators = {
  getOrder: ingredientsData => dispatch => {
    fetchPost("/orders", ingredientsData)
      .then(response => {
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
        console.error("Не получилось оформить заказ");
      })
      .finally(() => {
        dispatch({ type: SET_LOADER, payload: false });
      });
  },
  setIsLoader: flag => ({ type: SET_LOADER, payload: flag }),
};
