import React from "react";
import styles from "./modalOverlay.module.css";
function ModalOverlay({ children }) {
  return <div className={styles.modalOverlay}>{children}</div>;
}

export default ModalOverlay;
