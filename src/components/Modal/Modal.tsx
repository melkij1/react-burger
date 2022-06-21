import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';
import classNames from 'classnames/bind';
import { useHiddenScrollBody } from '../../hooks/useHiddenScrollBody';
import styles from './modal.module.css';
interface IModal {
  show: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}
function Modal({ show, children, onClose }: IModal) {
  const overlayRef = useRef(null);
  useHiddenScrollBody(show);
  const closeOnEsc = (e: Event) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const onOutside = (event: Event) => {
    if (
      show &&
      overlayRef.current &&
      !overlayRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEsc);
    return () => {
      document.body.removeEventListener('keydown', closeOnEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, overlayRef]);

  return (
    show &&
    ReactDOM.createPortal(
      <div className="modalTarget">
        <ModalOverlay />
        <div
          ref={overlayRef}
          className={classNames(styles.modal, 'pt-15 pb-15 pr-10 pl-10')}
        >
          <button
            type="button"
            className={styles.modalCloseButton}
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>,
      document.getElementById('modals')
    )
  );
}

export default Modal;
