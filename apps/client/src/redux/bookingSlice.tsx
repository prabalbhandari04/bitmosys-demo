// bookingSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  bookings: [],
  status: 'idle',
  error: null,
};

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await axios.get('http://localhost:3000/api/booking');
  return response.data;
});

export const createBooking = createAsyncThunk('bookings/createBooking', async (newBooking) => {
  const response = await axios.post('http://localhost:3000/api/booking', newBooking);
  return response.data;
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings.push(action.payload); // Add newly created booking to the state
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bookingSlice.reducer;
