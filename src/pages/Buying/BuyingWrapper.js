import React from 'react';
import styles from './Buying.module.css';
/**
 * Компонент обертки оплаты билета
 */
export default function BuyingWrapper(props) {
  return (
    <main>
      <section className={styles.ticket}>
        <header className={styles.ticket__check}>
          <h2 className={styles.ticket__check_title}>Вы выбрали билеты:</h2>
        </header>
        <div className={styles.ticket__info_wrapper}>{props.children}</div>
      </section>
    </main>
  );
}
