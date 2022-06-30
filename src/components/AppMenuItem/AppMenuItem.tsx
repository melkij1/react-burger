import React from 'react';
import classNames from 'classnames/bind';
import styles from './AppMenuItem.module.css';
interface IAppMenuItem {
  title: string;
  Icon: JSX.Element;
  onClick: () => void;
  isActive?: boolean | null;
}
function AppMenuItem({ title, Icon, onClick, isActive }: IAppMenuItem) {
  return (
    <li
      className={classNames(styles.headerMenuItem, 'pt-4 pb-4 pl-5 pr-5')}
      onClick={onClick}
    >
      <div className={classNames(styles.headerMenuItemIcon, 'mr-2')}>
        {Icon}
      </div>
      <span className="text text_type_main-default">{title}</span>
    </li>
  );
}

export default AppMenuItem;
