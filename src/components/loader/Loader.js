import React from 'react';
import styles from './Loader.module.css';
/**
 * Компонент лоадера для индикации загрузки
 */
export default function Loader({ size = 's' }) {
  //Size: s|m|b
  return (
    <div role="status">
      <span className={`${styles['visually-hidden']}`}>Loading...</span>
      <div className={`${styles.preloader} ${styles[size]}`}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
