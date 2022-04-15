import React from "react";
import classNames from "classnames/bind";
import styles from "./AppMenuItem.module.css";
function AppMenuItem({ title, Icon }) {
  return (
    <li className={classNames(styles.headerMenuItem, "pt-4 pb-4 pl-5 pr-5")}>
      <div className={classNames(styles.headerMenuItemIcon, "mr-2")}>
        <Icon />
      </div>
      <span className="text text_type_main-default">{title}</span>
    </li>
  );
}

export default AppMenuItem;
