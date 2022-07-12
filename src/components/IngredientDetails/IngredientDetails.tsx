import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../Modal/modal.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { modalIsOpen } = useTypedSelector((state) => state.modalState);
  const { ingredients } = useTypedSelector((state) => state.ingredientsState);
  const item = ingredients.find((ingredient) => ingredient._id === id);
  return (
    <div
      className={classNames(
        styles.modalContent,
        styles.modalContentIngredient,
        !modalIsOpen ? styles.modalContentMargin : '',
        'modal-wrap'
      )}
      data-test-id="modal"
    >
      <div className="modalHeader text text_type_main-large">
        Детали ингредиента
      </div>
      {item && (
        <div className={styles.modalContentWrap}>
          <div className="modalContentImg mb-4">
            <img src={item.image_large} alt="" />
          </div>
          <div
            className={classNames(
              styles.modalContentTitle,
              ' text text_type_main-medium mb-8'
            )}
          >
            {item.name}
          </div>
          <div className={styles.modalContentItems}>
            <div className={classNames(styles.modalContentItem, 'mr-5')}>
              <span className="text text_type_main-default">Калории,ккал</span>
              <div className={styles.value}>{item.calories}</div>
            </div>
            <div className={classNames(styles.modalContentItem, 'mr-5')}>
              <span className="text text_type_main-default">Белки, г</span>
              <div className={styles.value}>{item.proteins}</div>
            </div>
            <div className={classNames(styles.modalContentItem, 'mr-5')}>
              <span className="text text_type_main-default">Жиры, г</span>
              <div className={styles.value}>{item.fat}</div>
            </div>
            <div className={classNames(styles.modalContentItem)}>
              <span className="text text_type_main-default">Углеводы, г</span>
              <div className={styles.value}>{item.carbohydrates}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default IngredientDetails;
