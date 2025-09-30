import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostTicket } from '../../api/index';
import { clearTicketInfo } from '../../store/SliceTicket';
import Loader from '../../components/loader/Loader';
import Button from '../../components/button/Button';
import TextParagraph from '../../components/text/TextParagraph';
import styles from './Buying.module.css';
/**
 * Компонент оплаты билета
 */
export default function Payment() {
  const { hallName, movieTitle, seanceStartTime } = useSelector(
    (state) => state.hall
  );
  const { ticketSeats, ticketTotal, qr, uuid, loading, error } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  const isDisabledButton =
    error || loading || !ticketSeats?.length || qr || uuid;
  const handlerGetQRCode = () => {
    if (isDisabledButton) return;
    dispatch(fetchPostTicket());
  };

  const ticketSeatsElement = ticketSeats.map((seatsRow, index) => (
    <p className={styles.ticket__info} key={index}>
      {'Ряд:'}
      <span className={`${styles.ticket__details} ${styles.ticket__chairs}`}>
        {seatsRow.rowIndex}
      </span>
      {' Места:'}
      {seatsRow.seatsList.map((seat) => (
        <span
          key={seat.col}
          className={`${styles.ticket__details} ${styles.ticket__chairs}`}
        >
          {seat.col}
        </span>
      ))}
    </p>
  ));

  useEffect(() => {
    clearTicketInfo();
  }, []);

  return (
    <>
      <p className={styles.ticket__info}>
        На фильм:
        <span className={`${styles.ticket__details} ${styles.ticket__title}`}>
          {movieTitle}
        </span>
      </p>
      {ticketSeatsElement}
      <p className={styles.ticket__info}>
        В зале:
        <span className={`${styles.ticket__details} ${styles.ticket__hall}`}>
          {hallName}
        </span>
      </p>
      <p className={styles.ticket__info}>
        Начало сеанса:
        <span className={`${styles.ticket__details} ${styles.ticket__start}`}>
          {seanceStartTime}
        </span>
      </p>

      {error && !loading && (
        <TextParagraph
          className={`${styles.paragraph} ${styles.error}`}
          text={error}
        />
      )}

      {!qr && !uuid && !error && (
        <>
          <p className={styles.ticket__info}>
            Стоимость:
            <span
              className={`${styles.ticket__details} ${styles.ticket__cost}`}
            >
              {ticketTotal}
            </span>
            {' рублей'}
          </p>

          {loading && <Loader size={'m'} />}

          <Button
            className={`${styles.accepting_button} ${
              isDisabledButton ? styles.accepting_button_disabled : ''
            }`}
            disabled={isDisabledButton}
            name={'получить код бронирования'}
            handler={handlerGetQRCode}
          />

          <p className={styles.ticket__hint}>
            После оплаты билет будет доступен в этом окне, а также придёт вам на
            почту. Покажите QR-код нашему контроллёру у входа в зал.
          </p>
          <p className={styles.ticket__hint}>Приятного просмотра!</p>
        </>
      )}

      {qr && !loading ? (
        <>
          <img className={styles.ticket__info_qr} src={qr} alt="qr-code" />
          <p className={styles.ticket__hint}>
            Покажите QR-код нашему контроллеру для подтверждения бронирования.
          </p>
          <p className={styles.ticket__hint}>Приятного просмотра!</p>
        </>
      ) : null}

      {!qr && uuid && !loading ? (
        <>
          <p className={styles.ticket__hint}>
            По техническим причинам QR-код временно недоступен. Для получения
            QR-кода, пожалуйста, сохраните идентификатор билета, указанный ниже
            и напишите в адрес техподдержки support@go2cinema.ru или свяжитесь с
            нами по телефону +7(987)654-32-10.
          </p>
          <p className={styles.ticket__hint}>
            Идентификатор билета:
            <span className={styles.ticket__details}>{uuid}</span>
          </p>
          <p className={styles.ticket__hint}>Приятного просмотра!</p>
        </>
      ) : null}
    </>
  );
}
