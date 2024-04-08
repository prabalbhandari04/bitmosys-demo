// store.js

import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';
import rateReducer from "./rateSlice"
import pnsReducer from "./pnsSlice"

export default configureStore({
  reducer: {
    bookings: bookingReducer,
    rates : rateReducer,
    pns : pnsReducer
  },
});
