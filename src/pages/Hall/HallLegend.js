import React from 'react';
import styles from './HallLegend.module.css';
/**
 * Компонент легенды кинозала
 */
export default function HallLegend({ prices }) {
  const { standartPrice, vipPrice } = prices;
  return (
    <div className={styles.legend}>
      <div className={styles.col}>
        <p className={styles.legend_price}>
          <span
            className={`${styles.scheme__chair} ${styles.scheme__chair_standart}`}
          />
          Свободно (<span className={''}>{standartPrice}</span>руб)
        </p>
        <p className={styles.legend_price}>
          <span
            className={`${styles.scheme__chair} ${styles.scheme__chair_vip}`}
          />
          Свободно VIP (<span className={''}>{vipPrice}</span>руб)
        </p>
      </div>
      <div className={styles.col}>
        <p className={styles.legend_price}>
          <span
            className={`${styles.scheme__chair} ${styles.scheme__chair_taken}`}
          />
          Занято
        </p>
        <p className={styles.legend_price}>
          <span
            className={`${styles.scheme__chair} ${styles.scheme__chair_selected}`}
          />
          Выбрано
        </p>
      </div>
    </div>
  );
}
