import React from 'react';
import MenuList from '../../../components/menu/list/MenuList';
import MenuListItem from '../../../components/menu/item/MenuListItem';
import MenuItemLink from '../../../components/menu/link/MenuItemLink';
import styles from './FilmSeances.module.css';
import { useParams } from 'react-router-dom';
/**
 * Компонент информации о сеансах элемента списка сеансов
 */
export default function FilmSeances({ className, hall }) {
  const { hallId, hallName, seances } = hall;
  const params = useParams();
  return (
    <div className={styles.hall}>
      <h3 className={styles.hall_title}>{hallName}</h3>
      <MenuList className={styles.seances_list} items={seances}>
        {(items) =>
          items.map((seance, index) => (
            <MenuListItem key={index} className={styles.seances_time_block}>
              <MenuItemLink
                route={`/${params.date}/seance/${seance.seanceId}`}
                className={styles.seances_time}
                name={seance.seanceStartTime}
              />
            </MenuListItem>
          ))
        }
      </MenuList>
    </div>
  );
}
