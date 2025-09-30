import React from 'react';
import styles from './HallInfo.module.css';
/**
 * Компонент информации о кинозале
 */
export default function HallInfo({ info }) {
  const { hallName, movieTitle, seanceStartTime } = info;
  return (
    <div className={styles.info}>
      <div className={styles.info_description}>
        <h2 className={styles.info_title}>{movieTitle}</h2>
        <p className={styles.info_start}>Начало сеанса: {seanceStartTime}</p>
        <p className={styles.info_hall}>{hallName}</p>
      </div>
      <div className={styles.info_hint}>
        <p>
          Тапните дважды,
          <br />
          чтобы увеличить
        </p>
      </div>
    </div>
  );
}
