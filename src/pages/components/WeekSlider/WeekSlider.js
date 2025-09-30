import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDaysWeek } from '../../../store/SliceMenu';
import NavMenu from '../../../components/menu/nav-menu/NavMenu';
import MenuItemNavLink from '../../../components/menu/navlink/MenuItemNavLink';
import { fetchGetMovies } from '../../../api';
import styles from './WeekSlider.module.css';
/**
 * Меню дней недели
 */
export default function WeekSlider() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { week, initDay } = useSelector((state) => state.menu);
  useEffect(() => {
    dispatch(getDaysWeek());
  }, [dispatch, initDay]);
  useEffect(() => {
    if (!('date' in params)) navigate('/' + initDay);
    if (
      'date' in params &&
      week.findIndex((day) => day.route === params.date) === -1
    )
      navigate('/');
  }, [initDay, navigate, params, week]);
  useEffect(() => {
    dispatch(fetchGetMovies());
  }, [dispatch, params]);
  return (
    <NavMenu className={styles.nav} items={week}>
      {(items) =>
        items.map((item, index) => (
          <MenuItemNavLink
            key={index}
            className={styles.nav__day}
            route={item.route}
            item={item}
          >
            {null}
          </MenuItemNavLink>
        ))
      }
    </NavMenu>
  );
}
