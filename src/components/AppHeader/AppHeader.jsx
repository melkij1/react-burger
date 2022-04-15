import React from "react";
import {
  Logo,
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import AppMenuItem from "../AppMenuItem/AppMenuItem";
function AppHeader() {
  return (
    <div className={`${styles.header} pt-4 pb-4`}>
      <div className="container">
        <div className={styles.headerWrap}>
          <div className={styles.headerMenuList}>
            <AppMenuItem title="Конструктор" Icon={BurgerIcon} />
            <AppMenuItem title="Лента заказов" Icon={ListIcon} />
          </div>
          <div className={styles.headerLogo}>
            <Logo />
          </div>
          <AppMenuItem title="Личный кабинет" Icon={ProfileIcon} />
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
