import React from "react";
import styles from "./AppMenuItem.module.css";
function AppMenuItem({ title, Icon }) {
  return (
    <div className={styles.headerMenuItem}>
      <Icon />
      <span>{title}</span>
    </div>
  );
}

export default AppMenuItem;
