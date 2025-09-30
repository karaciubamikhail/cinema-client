import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  ticketSeats: [],
  ticketTotal: '',
  qr: '',
  uuid: '',
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTicket(state, action) {
      //группировка по ряду типа [{Ряд:1, Места:1,2,3},...]
      const seatsArr = action.payload;
      state.ticketSeats = action.payload;
      //получаем стоимость билета
      state.ticketTotal = seatsArr
        .map((seatsRow) => seatsRow.seatsList)
        .flat()
        .reduce((sum, seat) => sum + seat.price, 0);
    },
    clearTicketInfo(state) {
      Object.assign(state, initialState);
    },
    //отправляем билет на сервер
    postTicketRequest(state) {
      state.loading = true;
      state.error = null;
    },
    //получаем QR код и id билета от сервера
    postTicketRequestSuccess(state, action) {
      state.loading = false;
      state.qr = action.payload.qr === 'error' ? '' : action.payload.qr;
      state.uuid = action.payload.uuid;
    },
    postTicketRequestFailed(state) {
      state.loading = false;
      state.error = `Произошла ошибка. Пожалуйста, повторите бронирование еще раз.`;
    },
  },
});

export const {
  setTicket,
  clearTicketInfo,
  postTicketRequest,
  postTicketRequestSuccess,
  postTicketRequestFailed,
} = ticketSlice.actions;

export default ticketSlice.reducer;
