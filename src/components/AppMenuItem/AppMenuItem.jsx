import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AppMenuItem.module.css";
AppMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
};
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
