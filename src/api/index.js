import {
  getMoviesRequest,
  getMoviesRequestSuccess,
  getMoviesRequestFailed,
} from '../store/SliceMovies';
import {
  getHallRequest,
  getHallRequestSuccess,
  getHallRequestFailed,
} from '../store/SliceHall';
import {
  postTicketRequest,
  postTicketRequestSuccess,
  postTicketRequestFailed,
} from '../store/SliceTicket';
import {
  functionGetTicketSeats,
  mapToInternalMovies,
  mapToInternalSeats,
} from './helpers';

const url = process.env.REACT_APP_API_URL_DEV;

/**
 * Загрузка списка фильмов с залами и сеансами
 */
export const fetchGetMovies = () => (dispatch) => {
  dispatch(getMoviesRequest());
  return fetch(`${url}/movies`)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error();
      }
      return response.json();
    })
    .then((result) => {
      dispatch(getMoviesRequestSuccess(mapToInternalMovies(result)));
    })
    .catch((e) => {
      dispatch(getMoviesRequestFailed(e.message));
    });
};

/**
 * Загрузка сеанса, фильма, зала и списка мест в зале
 */
export const fetchGetHall = (date, seanceId) => (dispatch) => {
  dispatch(getHallRequest());
  return fetch(`${url}/${date}/seance/${seanceId}`)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error();
      }
      return response.json();
    })
    .then((result) => {
      dispatch(
        getHallRequestSuccess({
          ...result,
          seats: mapToInternalSeats(result),
          date,
          seanceId,
        })
      );
    })
    .catch((e) => {
      dispatch(getHallRequestFailed(e.message));
    });
};

/**
 * Бронирование заказа и получение билета
 */
export const fetchPostTicket = () => (dispatch, getState) => {
  const {
    ticket: { ticketSeats, ticketTotal },
    hall: { seanceId, date },
  } = getState();
  const ticketSeatsInfo = functionGetTicketSeats(ticketSeats);
  dispatch(postTicketRequest());
  return fetch(`${url}/ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      seance_id: seanceId,
      seats: ticketSeatsInfo,
      price: ticketTotal,
      date,
    }),
  })
    .then((result) => {
      if (result.status < 200 || result.status >= 300) {
        throw new Error();
      }
      return result.json();
    })
    .then((response) => {
      dispatch(postTicketRequestSuccess(response));
    })
    .catch((e) => {
      dispatch(postTicketRequestFailed(e.message));
    });
};
