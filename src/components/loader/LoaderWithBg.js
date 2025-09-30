import React from 'react';
import Loader from './Loader';
import styles from './LoaderWithBg.module.css';
/**
 * Компонент лоадера с фоном для индикации загрузки
 */
export default function LoaderWithBg({ size = 's' }) {
  //Size: s|m|b
  return (
    <div className={styles.bg}>
      <Loader size={size} />
    </div>
  );
}
