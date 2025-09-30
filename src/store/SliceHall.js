import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '-',
  hallName: '-',
  movieTitle: '-',
  seanceId: '-',
  seanceStartTime: '-',
  seats: [],
  standartPrice: '-',
  vipPrice: '-',
  loading: false,
  error: null,
};

const hallSlice = createSlice({
  name: 'hall',
  initialState,
  reducers: {
    getHallRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getHallRequestSuccess(state, action) {
      state.loading = false;
      state.seats = action.payload.seats;
      state.movieTitle = action.payload.movie_title;
      state.hallName = action.payload.name;
      state.seanceStartTime = action.payload.start_time;
      state.standartPrice = action.payload.price_standard;
      state.date = action.payload.date;
      state.seanceId = action.payload.seanceId;
    },
    getHallRequestFailed(state, action) {
      state.loading = false;
      state.error = `Произошла ошибка. Пожалуйста, перезагрузите страницу и попробуйте еще раз.`;
    },
  },
});

export const { getHallRequest, getHallRequestSuccess, getHallRequestFailed } =
  hallSlice.actions;

export default hallSlice.reducer;
