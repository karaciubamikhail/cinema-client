import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetHall } from '../../api';
import HallList from './HallList';
import HallRowSeats from './HallRowSeats';
import HallSeat from './HallSeat';
/**
 * Страница выбора мест в кинозале
 */
export default function Hall() {
  const params = useParams();
  const { seats } = useSelector((state) => state.hall);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetHall(params.date, params.seanceId));
  }, [dispatch, params.date, params.seanceId]);

  const [selectedArr, setSelect] = useState([]);
  const handlerSelectSeat = ({ target }, id) => {
    setSelect((prev) => {
      const idInState = prev.find((item) => item?.id === id);
      if (idInState) return prev.filter((item) => item.id !== id);
      return [...prev, { id }];
    });
  };

  return (
    <>
      <HallList className={''} items={seats} selected={selectedArr}>
        {(items) =>
          items.map((seatsRow) => (
            <HallRowSeats className={''} key={seatsRow.rowIndex}>
              {() =>
                seatsRow.seatsList.map((seat) => (
                  <HallSeat
                    className={''}
                    key={seat.id}
                    seat={seat}
                    handler={handlerSelectSeat}
                    selected={selectedArr}
                  />
                ))
              }
            </HallRowSeats>
          ))
        }
      </HallList>
    </>
  );
}
