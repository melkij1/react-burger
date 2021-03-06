import React, { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import classNames from 'classnames/bind';
import styles from './BurgerIngredients.module.css';
import BurgerIngredientSection from '../BurgerIngredientSection/BurgerIngredientSection';
import { ingredientType } from '../../types';

export interface ITypesIngredientObject {
  [index: string]: ingredientType[];
}

interface ITEIngredientObject {
  bun: 'Булки';
  sauce: 'Соусы';
  main: 'Начинки';
}

function BurgerIngredients() {
  const { ingredients } = useTypedSelector((state) => state.ingredientsState);
  const ingredientTypeTitles: ITEIngredientObject = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState<string>('bun');
  const sortItems: ingredientType[] = ingredients.sort((a, b) => {
    if (a.type === 'bun' && b.type !== 'bun') {
      return -1;
    } else if (a.type === 'sauce' && b.type !== 'sauce') {
      return -1;
    } else {
      return 0;
    }
  });

  const typesIngredient: ITypesIngredientObject = {};

  sortItems.forEach((item) => {
    const { type } = item;
    if (!typesIngredient[type]) {
      typesIngredient[type] = [];
    }
    typesIngredient[type].push(item);
  });

  const handleScroll = () => {
    const hasCurrent =
      scrollRef.current &&
      bunsRef.current &&
      saucesRef.current &&
      mainsRef.current;
    if (hasCurrent) {
      const scrollContainerPosition =
        scrollRef.current.getBoundingClientRect().top;

      const bunHeaderPosition = bunsRef?.current.getBoundingClientRect().top;
      const sauceHeaderPosition =
        saucesRef?.current.getBoundingClientRect().top;
      const mainHeaderPosition = mainsRef?.current.getBoundingClientRect().top;

      const bunsDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
      const saucesDiff = Math.abs(
        scrollContainerPosition - sauceHeaderPosition
      );
      const mainsDiff = Math.abs(scrollContainerPosition - mainHeaderPosition);
      if (bunsDiff < saucesDiff) {
        setCurrent('bun');
      } else if (saucesDiff < mainsDiff) {
        setCurrent('sauce');
      } else {
        setCurrent('main');
      }
    }
  };

  return (
    <div className="col">
      <div className="flex">
        {ingredientTypeTitles &&
          Object.keys(ingredientTypeTitles).map((type) => (
            <Tab
              key={type}
              active={current === type}
              onClick={setCurrent}
              value={type}
            >
              {/* {ingredientTypeTitles[type]}
               */}
              {(ingredientTypeTitles as any)[type]}
            </Tab>
          ))}
      </div>
      <div
        className={classNames(styles.burgerItems, 'customScroll')}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {typesIngredient &&
          Object.keys(typesIngredient).map((ingredient, index) => (
            <BurgerIngredientSection
              key={ingredient}
              // title={ingredientTypeTitles[ingredient]}
              title={(ingredientTypeTitles as any)[ingredient]}
              ingredients={typesIngredient[ingredient]}
              bunsRef={bunsRef}
              saucesRef={saucesRef}
              mainsRef={mainsRef}
            />
          ))}
      </div>
    </div>
  );
}

export default BurgerIngredients;
