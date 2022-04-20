import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from "./modal.module.css";
import classNames from "classnames/bind";
function Modal({ show, children, onClose }) {
  const closeOnEsc = e => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEsc);

    return () => document.body.removeEventListener("keydown", closeOnEsc);
  }, []);

  return (
    show &&
    ReactDOM.createPortal(
      <ModalOverlay>
        <div className={classNames(styles.modal, "pt-15 pb-15 pr-10 pl-10")}>
          <button
            type="button"
            className={styles.modalCloseButton}
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
          {children}
          {/* {type === "ingredient" ? (
            <IngredientDetails item={item} />
          ) : (
            <OrderDetails />
          )} */}
        </div>
      </ModalOverlay>,
      document.getElementById("modals")
    )
  );
}

export default Modal;
