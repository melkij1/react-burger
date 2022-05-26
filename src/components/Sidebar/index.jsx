import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.module.css';
function Sidebar() {
  const history = useHistory();
  const profilePage = useRouteMatch('/profile');
  const profilePageActive = profilePage && profilePage.isExact;
  return (
    <div className={classNames(styles.sidebar,'mr-15')}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li className={classNames(styles.nav_item,'text text_type_main-medium')}>Профиль</li>
          <li className={classNames(styles.nav_item,'text text_type_main-medium')}>История заказов</li>
          <li className={classNames(styles.nav_item,'text text_type_main-medium')}>Выход</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
