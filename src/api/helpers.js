/**
 * установка числа дней отображаемых на главной странице
 * при изменении возможно нужно будет также поменять
 * CSS свойство flex-basis в MenuWeekly.module.css
 */
const DAYS_OFFSET = 7;

/**
 * Получение строки вида "YYYY-MM-DD" из объекта даты
 */
const getDateFormatYMDFunction = (dateObj) => {
  if (dateObj instanceof Date) {
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1 < 10 ? '0' : ''}${
      dateObj.getMonth() + 1
    }-${dateObj.getDate() < 10 ? '0' : ''}${dateObj.getDate()}`;
  }
  return null;
};

/**
 * Получение названия дня из объекта даты
 */
const getDayNameFunction = (dateObj) => {
  const dayNamesObj = {
    0: 'Вс',
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
  };
  if (dateObj instanceof Date) {
    return dayNamesObj[`${dateObj.getDay()}`];
  }
  return null;
};

/**
 * Получение начального массива дней недели
 * * @param startDay стартовый день недели в формате даты
 */
const getInitialWeekArr = (startDay) => {
  let date;
  const isWeekend = (dayName) => {
    if (dayName === 'Сб') return true;
    if (dayName === 'Вс') return true;
    return false;
  };
  const isToday = (today, date) => {
    return today.getMonth() - date.getMonth() === 0 &&
      today.getDate() - date.getDate() === 0 &&
      today.getFullYear() - date.getFullYear() === 0
      ? true
      : false;
  };
  if (startDay instanceof Date) {
    date = startDay;
  }
  if (typeof startDay === 'string') {
    date = new Date(startDay);
  }
  const today = new Date();
  const arr = [];
  for (let i = 0; i < DAYS_OFFSET; i++) {
    arr.push({
      dayName: getDayNameFunction(date),
      dayNumber: date.getDate(),
      isToday: isToday(today, date),
      isWeekend: isWeekend(getDayNameFunction(date)),
      route: getDateFormatYMDFunction(date),
    });
    date.setDate(date.getDate() + 1);
  }
  arr.push({
    dayName: '',
    dayNumber: 0,
    isToday: false,
    isWeekend: false,
    route: '',
  });
  return arr;
};

/**
 * Создание из массива объектов нового массива, упорядоченного по ключу
 * Например, массив пар значений "ряд"-"кресло" можно преобразовать в двумерный массив,
 * где каждая строка - это массив всех "кресел", принадлежащих своему "ряду"
 * @param key имя ключа
 * @param objArr массив объектов
 */
const functionObjsArrToKeyFiltered = (objArr, key) => {
  const inputArr = objArr;
  const outputArrMap = [];
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr.findIndex((el) => el[key] === i) === -1) continue;
    outputArrMap.push({
      [`${key}Index`]: i,
      seatsList: inputArr.filter((el) => el[key] === i),
    });
  }
  return outputArrMap;
};

/**
 * Получение информации о забронированных сидениях для билета
 * @param ticketSeats массив сидений, сгруппированных по рядам
 */
const functionGetTicketSeats = (ticketSeats) => {
  return ticketSeats.reduce(
    (result, seatsRow) => {
      const seatsIdsArr = seatsRow.seatsList.map((seat) => {
        return seat.id;
      });
      const seatsColArr = seatsRow.seatsList.map((seat) => {
        return seat.col;
      });
      return {
        seatsIds: [...result.seatsIds, ...seatsIdsArr],
        seatsInfo: [
          ...result.seatsInfo,
          `row: ${seatsRow.rowIndex}, seats: ${seatsColArr}`,
        ],
      };
    },
    { seatsIds: [], seatsInfo: [] }
  );
};

/**
 * Получение строки для отображения количества минут
 * @param duration длительность фильма в минутах
 */
const getMinutesWords = (duration) => {
  let text;
  const num = parseInt(duration);
  switch (num) {
    case 1:
      text = 'а';
      break;

    case 2:
    case 3:
    case 4:
      text = 'ы';
      break;

    default:
      text = '';
      break;
  }
  return text;
};

/**
 * Получение массива фильмов с требуемыми именами ключей вместо серверных
 * @param extMoviesArr массив фильмов от сервера
 * @param intMoviesArr массив фильмов для клиента
 */
const mapToInternalMovies = (extMoviesArr) => {
  const mapToInternalMoviesArr = [];
  extMoviesArr.forEach((movie) => {
    const internalMovieHallsArr = [];
    movie.halls.forEach((hall) => {
      if (hall) {
        const internalMovieSeancesArr = [];
        hall.seances.forEach((seance) => {
          internalMovieSeancesArr.push({
            seanceId: seance.id,
            seanceStartTime: seance.start_time,
          });
        });

        internalMovieHallsArr.push({
          hallId: hall.id,
          hallName: hall.name,
          seances: internalMovieSeancesArr,
        });
      }
    });

    if (internalMovieHallsArr.length) {
      mapToInternalMoviesArr.push({
        movieId: movie.id,
        movieTitle: movie.title,
        movieDescription: movie.description,
        movieDuration: movie.duration_minutes,
        moviePoster: movie.picture,
        movieOrigin: movie.origin,
        movieHalls: internalMovieHallsArr,
      });
    }
  });

  return mapToInternalMoviesArr;
};

/**
 * Получение массива сидений с требуемыми именами ключей вместо серверных
 * @param extSeatsArr массив фильмов от сервера
 * @param intSeatsArr массив фильмов для клиента
 */
const mapToInternalSeats = (extSeatsArr) => {
  const mapToInternalSeats = extSeatsArr.seats.map((seat) => ({
    id: seat.id,
    row: seat.index_row - 1,
    col: seat.index_col - 1,
    type: seat.seat_type.toString(),
    isOrdered: seat.is_ordered,
  }));
  const mapToInternalSeatsArr = functionObjsArrToKeyFiltered(
    mapToInternalSeats,
    'row'
  );
  return mapToInternalSeatsArr;
};

export {
  DAYS_OFFSET,
  getInitialWeekArr,
  getDateFormatYMDFunction,
  functionObjsArrToKeyFiltered,
  functionGetTicketSeats,
  getMinutesWords,
  mapToInternalMovies,
  mapToInternalSeats,
};
