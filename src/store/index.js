import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './SliceMenu';
import moviesReducer from './SliceMovies';
import hallReducer from './SliceHall';
import ticketReducer from './SliceTicket';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    movies: moviesReducer,
    hall: hallReducer,
    ticket: ticketReducer,
  },
});

export default store;
