import React, { useEffect, useRef, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';
import classNames from 'classnames/bind';
// import { useHiddenScrollBody } from '../../hooks/useHiddenScrollBody';
import styles from './modal.module.css';
interface IModal {
  show: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}
const Modal: FC<IModal> = ({ show, children, onClose }) => {
  const target: any = document.getElementById('modals');
  const overlayRef = useRef<HTMLDivElement>(null);
  // useHiddenScrollBody(show);
  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const onOutside = (event: Event) => {
    if (
      show &&
      overlayRef.current &&
      !overlayRef.current.contains(event.target as Node)
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

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  if (show) {
    return (
      // show &&
      ReactDOM.createPortal(
        <div className="modalTarget">
          <ModalOverlay />
          <div
            ref={overlayRef}
            className={classNames(styles.modal, 'pt-15 pb-15 pr-10 pl-10')}
          >
            <button
              type="button"
              className={classNames(styles.modalCloseButton, 'btn-close-modal')}
              onClick={onClose}
            >
              <CloseIcon type="primary" />
            </button>
            {children}
          </div>
        </div>,
        target
      )
    );
  } else {
    return null;
  }
};

export default Modal;
