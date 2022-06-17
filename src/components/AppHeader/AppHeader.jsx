import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  Logo,
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';
import AppMenuItem from '../AppMenuItem/AppMenuItem';
function AppHeader() {
  const history = useHistory();
  const mainPage = useRouteMatch('/');
  const feedPage = useRouteMatch('/feed');
  const profilePage = useRouteMatch('/profile');
  const mainPageActive = mainPage && mainPage.isExact;
  const feedPageActive = feedPage && feedPage.isExact;
  const profilePageActive = profilePage && profilePage.isExact;
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className="container">
        <nav className={styles.headerWrap}>
          <ul className={styles.headerMenuList}>
            <AppMenuItem
              title="Конструктор"
              Icon={BurgerIcon}
              onClick={() => {
                history.push({
                  pathname: '/',
                });
              }}
              isActive={mainPageActive}
            />
            <AppMenuItem
              title="Лента заказов"
              Icon={ListIcon}
              onClick={() => {
                history.push({
                  pathname: '/feed',
                });
              }}
              isActive={feedPageActive}
            />
          </ul>
          <div className={styles.headerLogo}>
            <Logo />
          </div>
          <AppMenuItem
            title="Личный кабинет"
            Icon={ProfileIcon}
            onClick={() => {
              history.push({
                pathname: '/profile',
              });
            }}
            isActive={profilePageActive}
          />
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
