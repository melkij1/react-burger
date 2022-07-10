import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.module.css';
import { useActions } from '../../hooks/useActions';
function Sidebar() {
  const { logoutUser } = useActions();
  const profilePage = useRouteMatch('/profile');
  const profileOrdersPage = useRouteMatch('/profile/orders');
  const profilePageActive = profilePage && profilePage.isExact;
  const profileOrdersPageActive =
    profileOrdersPage && profileOrdersPage.isExact;

  const logout = () => {
    logoutUser();
    // if (res) {
    // }
  };

  return (
    <div className={classNames(styles.sidebar, 'mr-15 sidebarWrap')}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          <li
            className={classNames(
              styles.nav_item,
              'text text_type_main-medium'
            )}
          >
            <Link
              to={{ pathname: '/profile' }}
              className={classNames(
                styles.nav_item,
                'text text_type_main-medium'
              )}
            >
              Профиль
            </Link>
          </li>
          <li
            className={classNames(
              styles.nav_item,
              'text text_type_main-medium'
            )}
          >
            <Link
              to="/profile/orders"
              className={classNames(
                styles.nav_item,
                'text text_type_main-medium'
              )}
            >
              История заказов
            </Link>
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
