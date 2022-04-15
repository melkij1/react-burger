import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerCards.module.css";
import classNames from "classnames/bind";
export default function BurgerCards() {
  const selectedIngredient = [
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      price: 1255,
      type: "bun",
      locker: true,
      position: "top",
    },
    {
      _id: "60666c42cc7b410027a1a9b9",
      name: "Соус традиционный галактический",
      type: "sauce",
      price: 15,
      image: "https://code.s3.yandex.net/react/code/sauce-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    },
    {
      _id: "60666c42cc7b410027a1a9b4",
      name: "Мясо бессмертных моллюсков Protostomia",
      type: "main",
      price: 1337,
      image: "https://code.s3.yandex.net/react/code/meat-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    },
    {
      _id: "60666c42cc7b410027a1a9bc",
      name: "Плоды Фалленианского дерева",
      type: "main",
      price: 874,
      image: "https://code.s3.yandex.net/react/code/sp_1.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
    },
    {
      _id: "60666c42cc7b410027a1a9bb",
      name: "Хрустящие минеральные кольца",
      type: "main",
      price: 300,
      image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
      image_mobile:
        "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      image_large:
        "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    },
    {
      _id: "60666c42cc7b410027a1a9bb",
      name: "Хрустящие минеральные кольца",
      type: "main",
      price: 300,
      image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
      image_mobile:
        "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
      image_large:
        "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    },
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      price: 1255,
      type: "bun",
      locker: true,
      position: "bottom",
    },
  ];

  const totalPrice = selectedIngredient.reduce(
    (acc, val) => acc + val.price,
    0
  );
  return (
    <div className="col">
      <div className={styles.burgerCards}>
        <div
          className={classNames(styles.burgerWrapper, "customScroll", "pr-2")}
        >
          {selectedIngredient &&
            selectedIngredient.map((item, index) => (
              <div className={styles.burgerCard} key={`${item._id}_${index}`}>
                {(index === 0 || index === selectedIngredient.length - 1) && (
                  <div className={styles.burderCardIcon}>
                    <DragIcon type="primary" />
                  </div>
                )}
                <ConstructorElement
                  type={item.position}
                  isLocked={item.locker}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            ))}
        </div>
      </div>
      <div className={classNames(styles.burgerTotalPrice, "mt-10 mr-4")}>
        <div
          className={classNames(
            styles.price,
            "text text_type_digits-medium mr-10"
          )}
        >
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className="button">
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}
