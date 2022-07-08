import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDrop } from 'react-dnd';
import { useActions } from '../../hooks/useActions';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';
import Loader from '../Icons/Loader';
import styles from './BurgerConstructor.module.css';
import classNames from 'classnames/bind';
import { ingredientType } from '../../types';

interface IBurgerCards {
  onDropHandler: (itemId: { id: string }) => void;
}

export default function BurgerCards({ onDropHandler }: IBurgerCards) {
  const history = useHistory();
  const {
    setPrice,
    removeIngredient,
    sortIngredientActions,
    getOrder,
    setIsLoader,
  } = useActions();
  const { burderConstructor, totalPrice } = useTypedSelector(
    (state) => state.burgerState
  );
  const { ingredients: ingredientsState } = useTypedSelector(
    (state) => state.ingredientsState
  );
  const { isAuth } = useTypedSelector((state) => state.userState);
  const { loader } = useTypedSelector((state) => state.orderState);
  const [hasDisabled, setHasDisabled] = useState<boolean>(false);
  const { bun, ingredients } = burderConstructor;
  const bunItem = bun?.[0];

  const [, dropIngredientCard] = useDrop({
    accept: 'ingredient-card',
    drop(itemId: { id: string }) {
      onDropHandler(itemId);
    },
  });
  const [, dropIngredient] = useDrop({ accept: 'ingredients-sort' });
  useEffect(() => {
    const bunPrice = bun[0]?.price * 2 || 0;
    const ingredientsPrices = ingredients?.reduce(
      (acc, val) => acc + val.price,
      0
    );
    setPrice(bunPrice + ingredientsPrices);
    if (!bunItem) {
      setHasDisabled(true);
    } else {
      setHasDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bun, ingredients, bunItem]);
  // }, [bun, ingredients, dispatch, bunItem]);

  const handlerName = (name: string, type: string | undefined) => {
    if (type) {
      if (type === 'top') {
        return `${name} (верх)`;
      } else {
        return `${name} (низ)`;
      }
    }
    return name;
  };

  const removeItem = (item: ingredientType, index: number) => {
    const findItem = ingredientsState.find((x) => x._id === item._id);
    if (findItem && findItem.__v > 0) {
      findItem.__v = findItem.__v - 1;
    }
    removeIngredient(index);
  };

  const orderAdd = async () => {
    setIsLoader(true);
    if (!isAuth) {
      history.push('/login');
      setIsLoader(false);
    }
    if (isAuth) {
      const bunId = bunItem._id;
      const ingredientsId = ingredients.map((x) => x._id);
      const ingredientsData = [bunId, ...ingredientsId, bunId];
      await getOrder(ingredientsData);
    }
  };

  const findIngredient = useCallback(
    (
      id?: string | undefined
    ): undefined | { findItem: ingredientType; index: number } => {
      if (id) {
        const findItem: ingredientType | undefined = ingredients.find(
          (x) => x._id === id
        );
        if (findItem) {
          return {
            findItem,
            index: ingredients.indexOf(findItem),
          };
        }
      }
    },
    [ingredients]
  );
  const sortIngredient = useCallback(
    (index, atIndex) => {
      sortIngredientActions({ index, atIndex });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <>
      <div className="col">
        <div className={styles.burgerCards}>
          <div
            className={styles.BurgerConstructorsWrapper}
            ref={dropIngredientCard}
          >
            {bunItem && (
              <div className={classNames(styles.burgerCard, 'pr-4')}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={handlerName(bunItem.name, 'top')}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
                />
              </div>
            )}
            <div
              ref={dropIngredient}
              className={classNames(
                styles.burgerWrapper,
                'customScroll',
                'pr-2'
              )}
            >
              {ingredients &&
                ingredients.map((item, index) => {
                  return (
                    <BurgerConstructorItem
                      key={item.uuid}
                      id={item._id}
                      ingredientsIndex={index}
                      findIngredient={findIngredient}
                      sortIngredient={sortIngredient}
                    >
                      <div className={styles.burderCardIcon}>
                        <DragIcon type="primary" />
                      </div>
                      <ConstructorElement
                        type={item.position}
                        isLocked={item.locker}
                        text={handlerName(item.name, item.position)}
                        price={item.price}
                        thumbnail={item.image}
                        handleClose={() => removeItem(item, index)}
                      />
                    </BurgerConstructorItem>
                  );
                })}
            </div>
            {bunItem && (
              <div className={classNames(styles.burgerCard, 'pr-4')}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={handlerName(bunItem.name, 'bottom')}
                  price={bunItem.price}
                  thumbnail={bunItem.image}
                />
              </div>
            )}
          </div>
        </div>
        <div className={classNames(styles.burgerTotalPrice, 'mt-10 mr-4')}>
          <div
            className={classNames(
              styles.price,
              'text text_type_digits-medium mr-10'
            )}
          >
            <span>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={styles.button_wrapper}>
            <Button
              type="primary"
              size="medium"
              onClick={orderAdd}
              disabled={hasDisabled}
            >
              {loader ? <Loader /> : 'Оформить заказ'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
