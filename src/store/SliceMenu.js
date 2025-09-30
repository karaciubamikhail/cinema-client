import { createSlice } from '@reduxjs/toolkit';
import {
  getDateFormatYMDFunction,
  getInitialWeekArr,
  DAYS_OFFSET,
} from '../api/helpers';

const startDay = getDateFormatYMDFunction(new Date());

const initialState = {
  initDay: startDay,
  week: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getDaysWeek(state) {
      state.week = getInitialWeekArr(state.initDay);
    },
    setInitDayOffset(state) {
      const dateObj = new Date(state.initDay);
      dateObj.setDate(dateObj.getDate() + DAYS_OFFSET);
      state.initDay = getDateFormatYMDFunction(dateObj);
    },
  },
});

export const { getDaysWeek, setInitDayOffset } = menuSlice.actions;

export default menuSlice.reducer;
