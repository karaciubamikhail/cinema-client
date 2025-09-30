import React from 'react';
import { setInitDayOffset } from '../../../store/SliceMenu';
import { Link, NavLink } from 'react-router-dom';
import styles from './MenuItemNavLink.module.css';
import { useDispatch } from 'react-redux';
/**
 * Компонент навигации элемента меню
 */
export default function MenuItemNavLink({ className, route, item, ...props }) {
  const { dayName, dayNumber, isToday, isWeekend } = item;
  const dispatch = useDispatch();
  const nextArrowClick = () => {
    dispatch(setInitDayOffset());
  };
  const classNameDayString = isToday
    ? isWeekend
      ? `${className} ${styles.day_weekend} ${styles.day_today}`
      : `${className} ${styles.day_today}`
    : isWeekend
    ? `${className} ${styles.day_weekend}`
    : className;
  const classNameDayChosenString = `${classNameDayString} ${styles.day_chosen}`;
  const classNameNextString = `${className} ${styles.day_next}`;

  if (dayNumber === 0) {
    return (
      <Link
        to={`/`}
        className={classNameNextString}
        onClick={nextArrowClick}
      ></Link>
    );
  }

  return (
    <NavLink
      to={`/${route || ''}`}
      className={({ isActive }) =>
        isActive ? classNameDayChosenString : classNameDayString
      }
    >
      <span className={styles.day_week}>{dayName}</span>
      <span className={styles.day_number}>{dayNumber}</span>
    </NavLink>
  );
}
