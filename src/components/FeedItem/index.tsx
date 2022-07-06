import React, { FC, useMemo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import cs from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import { Order } from '../../types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { formatDate } from '../../helpers/time';
import { useActions } from '../../hooks/useActions';
interface IFeedItem {
  order: Order;
}
const FeedItem: FC<IFeedItem> = ({ order }) => {
  const location = useLocation();
  const history = useHistory();
  const { openModalAction } = useActions();
  const { ingredients: ingredientsState } = useTypedSelector(
    (state) => state.ingredientsState
  );
  const { wsConnected } = useTypedSelector((state) => state.feedState);

  const findImages = (id: string): string | undefined => {
    return ingredientsState.find((x) => x._id === id)?.image;
  };
  const price = useMemo(() => {
    let ingredientsPrice = 0;
    if (ingredientsState === undefined) {
      return 0;
    }
    order.ingredients.forEach((x) => {
      let price: number;
      if (ingredientsState && ingredientsState.length > 0) {
        price = ingredientsState.find((i) => i?._id === x)!.price | 0;

        if (price) {
          ingredientsPrice += price;
        }
      }
    });
    return ingredientsPrice;
  }, [ingredientsState]);

  const checkOrder = (order: Order): boolean => {
    return (
      order !== undefined &&
      order != null &&
      Object.keys(order).length > 0 &&
      order.ingredients !== null &&
      order.ingredients !== undefined &&
      order.ingredients.length > 0
    );
  };
  const clickOrder = () => {
    if (checkOrder(order)) {
      openModalAction({ modalIsOpen: true, mode: 'FeedDetails' });
      history.push({
        pathname: `/feed/${order._id}`,
        state: {
          background: location,
        },
      });
    }
  };

  if (!ingredientsState.length) {
    return null;
  }
  // to={{
  //   pathname: `/feed/${order._id}`,
  //   state: { background: location },
  // }}
  return (
    <div className={cs(styles.feedItem, 'p-6 mr-2 mb-4')} onClick={clickOrder}>
      <div className={cs(styles.feedItemTop, 'mb-6')}>
        <div className={cs(styles.number, 'text text_type_digits-default')}>
          {`#${order.number}`}
        </div>
        <div className={cs(styles.date, 'text text_color_inactive')}>
          {formatDate(order.createdAt)}
        </div>
      </div>
      <div
        className={cs(styles.feedItemName, 'text text_type_main-medium mb-6')}
      >
        {order.name}
      </div>

      <div className={styles.feedItemBottom}>
        <div className={cs(styles.feedItemIngredients, 'pr-6')}>
          {order.ingredients &&
            order.ingredients.map((ingredient, index) =>
              index <= 5 ? (
                <div
                  className={styles.feedItemIngredient}
                  key={`feedItemIngredients_${ingredient}_${index}`}
                >
                  <img src={findImages(ingredient)} alt="" />
                  {order.ingredients.length > 6 && index === 5 ? (
                    <div
                      className={cs(
                        styles.count,
                        'text text_type_digits-default text_type_main-medium'
                      )}
                    >
                      +{order.ingredients.length - 6}
                    </div>
                  ) : null}
                </div>
              ) : null
            )}
        </div>
        <div className={styles.feedItemPrice}>
          {ingredientsState ? (
            <span className="text text_type_main-medium">{price}</span>
          ) : null}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
