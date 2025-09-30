import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getMoviesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getMoviesRequestSuccess(state, action) {
      state.loading = false;
      state.movies = action.payload;
    },
    getMoviesRequestFailed(state, action) {
      state.loading = false;
      state.error = `Произошла ошибка. Пожалуйста, перезагрузите страницу и попробуйте еще раз`;
    },
  },
});

export const {
  getMoviesRequest,
  getMoviesRequestSuccess,
  getMoviesRequestFailed,
} = moviesSlice.actions;

export default moviesSlice.reducer;
