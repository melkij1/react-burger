import React, { FC, useMemo } from 'react';
import cs from 'classnames';
import styles from './style.module.css';
import { Order } from '../../types';
interface IFeedTotal {
  orders: Order[];
  total: number;
  totalToday: number;
}
export const FeedTotal: FC<IFeedTotal> = ({ orders, total, totalToday }) => {
  const findDoneArray: Array<Order[]> | undefined = useMemo(() => {
    const doneArray = orders.filter((x) => x.status === 'done') || [];
    if (doneArray.length) {
      const arr = doneArray.slice(-20);
      return arr.reduce(
        (p: Array<Order[]>, c: Order) => {
          if (p[p.length - 1].length === 10) {
            p.push([]);
          }

          p[p.length - 1].push(c);
          return p;
        },
        [[]]
      );
    }
  }, [orders]);
  const findNotDoneArray: Array<Order[]> | undefined = useMemo(() => {
    const doneArray = orders.filter((x) => x.status !== 'done') || [];
    if (doneArray.length) {
      return doneArray.reduce(
        (p: Array<Order[]>, c: Order) => {
          if (p[p.length - 1].length === 5) {
            p.push([]);
          }

          p[p.length - 1].push(c);
          return p;
        },
        [[]]
      );
    }
  }, [orders]);
  return (
    <div className={styles.feedTotal}>
      <div className={cs(styles.feedTotalTop)}>
        <div className={cs(styles.feedTotalTopLeft, 'mr-9')}>
          <div className={styles.feedTotalItem}>
            {findDoneArray &&
              findDoneArray.map((x, idx) => (
                <div
                  className={cs(styles.feedTotalItemW, 'mb-15')}
                  key={`index_${idx}`}
                >
                  <div className={cs(styles.title, 'mb-6')}>Готовы:</div>
                  <div className={styles.items}>
                    {x &&
                      x.map((item, index) => (
                        <span
                          className="text text_type_digits-default"
                          key={`index_text${index}`}
                        >
                          {item?.number}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.feedTotalTopRight}>
          <div className={styles.feedTotalItem}>
            {findNotDoneArray &&
              findNotDoneArray.map((x, idx) => (
                <div
                  className={cs(styles.feedTotalItemW, 'mb-15')}
                  key={`index_${idx}_not`}
                >
                  <div className={cs(styles.title, 'mb-6')}>В работе:</div>
                  <div className={styles.items}>
                    {x &&
                      x.map((item, index) => (
                        <span
                          className="text text_type_digits-default"
                          key={`index_text${index}_not_done`}
                        >
                          {item?.number}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={cs(styles.feedTotalBlock, 'mb-6')}>
        <div
          className={cs(styles.feedTotalTitle, 'text text_type_main-medium')}
        >
          Выполнено за все время:
        </div>
        <div
          className={cs(styles.feedTotalNumber, 'text text_type_digits-large')}
        >
          {total}
        </div>
      </div>
      <div className={cs(styles.feedTotalBlock, 'mb-6')}>
        <div
          className={cs(styles.feedTotalTitle, 'text text_type_main-medium')}
        >
          Выполнено за сегодня:
        </div>
        <div
          className={cs(styles.feedTotalNumber, 'text text_type_digits-large')}
        >
          {totalToday}
        </div>
      </div>
    </div>
  );
};
