import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.module.css';
import { useActions } from '../../hooks/useActions';
function Sidebar() {
  const { logoutUser } = useActions();
  const profilePage = useRouteMatch('/profile');
  const profilePageActive = profilePage && profilePage.isExact;

  const logout = () => {
    const res = logoutUser();
    if (res) {
      console.log(res, 'logout');
    }
  };

  return (
    <div className={classNames(styles.sidebar, 'mr-15')}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li
            className={classNames(
              styles.nav_item,
              'text text_type_main-medium'
            )}
          >
            Профиль
          </li>
          <li
            className={classNames(
              styles.nav_item,
              'text text_type_main-medium'
            )}
          >
            История заказов
          </li>
          <li
            className={classNames(
              styles.nav_item,
              'text text_type_main-medium'
            )}
            onClick={logout}
          >
            Выход
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
