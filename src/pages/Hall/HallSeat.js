import React from 'react';
import styles from './HallSeat.module.css';
/**
 * Компонент элемента ряда кресел кинозала
 */
export default function HallSeat({
  className,
  seat,
  selected,
  handler,
  ...props
}) {
  const { id, type, isOrdered } = seat;
  const isSelected = selected.findIndex((item) => item.id === id) > -1;
  if (isOrdered)
    return (
      <span
        className={`${styles.scheme__chair} ${styles.scheme__chair_taken}`}
      />
    );

  if (type === '0')
    return (
      <span
        className={`${styles.scheme__chair} ${styles.scheme__chair_disabled}`}
      />
    );

  if (type === '1')
    return (
      <span
        className={`${styles.scheme__chair} ${styles.scheme__chair_standart} ${
          isSelected ? styles.scheme__chair_selected : ''
        }`}
        onClick={(e) => handler(e, id)}
      />
    );

  if (type === '2')
    return (
      <span
        className={`${styles.scheme__chair} ${styles.scheme__chair_vip} ${
          isSelected ? styles.scheme__chair_selected : ''
        }`}
        onClick={(e) => handler(e, id)}
      />
    );
}
