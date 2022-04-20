import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";
import classNames from "classnames/bind";
import { useHiddenScrollBody } from "../../hooks/useHiddenScrollBody";
import styles from "./modal.module.css";
Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};
function Modal({ show, children, onClose }) {
  const overlayRef = useRef(null);
  useHiddenScrollBody(show);
  const closeOnEsc = e => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  const onOutside = event => {
    if (
      show &&
      overlayRef.current &&
      !overlayRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEsc);
    return () => {
      document.body.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [show, overlayRef]);

  return (
    show &&
    ReactDOM.createPortal(
      <div className="modalTarget">
        <ModalOverlay />
        <div
          ref={overlayRef}
          className={classNames(styles.modal, "pt-15 pb-15 pr-10 pl-10")}
        >
          <button
            type="button"
            className={styles.modalCloseButton}
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>,
      document.getElementById("modals")
    )
  );
}

export default Modal;
