import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTicket } from '../../store/SliceTicket';
import Loader from '../../components/loader/Loader';
import FilmItem from '../../components/film-item/FilmItem';
import Button from '../../components/button/Button';
import HallInfo from './HallInfo';
import HallLegend from './HallLegend';
import TextParagraph from '../../components/text/TextParagraph';
import styles from './HallList.module.css';

/**
 * Компонент схемы кинозала
 */
export default function HallList({ className, items, selected, ...props }) {
  const {
    standartPrice,
    vipPrice,
    hallName,
    movieTitle,
    seanceStartTime,
    loading,
    error,
  } = useSelector((state) => state.hall);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDisabledButton = !selected?.length || !items?.length;
  const handlerMakeOrder = () => {
    if (isDisabledButton) return;
    const selectedMap = items
      .map((row) => {
        const seatsList = row.seatsList.filter(
          (o) => selected.findIndex((s) => s.id === o.id) !== -1
        );
        return seatsList?.length
          ? {
              ...row,
              seatsList: seatsList.map((o) => ({
                ...o,
                price:
                  o.type === '1'
                    ? standartPrice
                    : o.type === '2'
                    ? vipPrice
                    : null,
              })),
            }
          : null;
      })
      .filter((el) => el);
    dispatch(setTicket(selectedMap));
    navigate('/payment');
  };

  return (
    <main className={className}>
      <FilmItem className={styles.hall}>
        {!loading ? (
          <>
            {!error ? (
              <>
                {items.length ? (
                  <>
                    <HallInfo
                      info={{ hallName, movieTitle, seanceStartTime }}
                    />
                    <div className={styles.scheme}>
                      <div className={styles.scheme__wrapper}>
                        {props.children(items)}
                      </div>

                      <HallLegend prices={{ standartPrice, vipPrice }} />
                    </div>
                  </>
                ) : (
                  <TextParagraph
                    className={`${styles.paragraph} ${styles.error}`}
                    text={
                      'Сегодня нет доступных киносеансов, пожалуйста, выберите другую дату'
                    }
                  />
                )}
              </>
            ) : (
              <TextParagraph
                className={`${styles.paragraph} ${styles.error}`}
                text={error}
              />
            )}
          </>
        ) : (
          <>
            Загрузка зала...
            <Loader size={'m'} />
          </>
        )}

        <Button
          className={`${styles.accepting_button} ${
            isDisabledButton ? styles.accepting_button_disabled : ''
          }`}
          name={'забронировать'}
          disabled={isDisabledButton}
          handler={() => handlerMakeOrder()}
        />
      </FilmItem>
    </main>
  );
}
