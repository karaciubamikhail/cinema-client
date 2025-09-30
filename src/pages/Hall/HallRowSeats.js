import React from 'react';
import styles from './HallRowSeats.module.css';
/**
 * Компонент ряда кресел страницы кинозала
 */
export default function HallRowSeats({
  className,
  seatsRow,
  rowIndex,
  ...props
}) {
  return (
    <div className={styles.scheme__row}>
      {props.children(seatsRow, rowIndex)}
    </div>
  );
}
