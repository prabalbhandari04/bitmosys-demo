import { BookingActionTypes } from './actionTypes/bookingActionTypes';

export interface Booking {
  // Define your booking interface here
}

interface FetchBookingsRequestAction {
  type: BookingActionTypes.FETCH_BOOKINGS_REQUEST;
}

interface FetchBookingsSuccessAction {
  type: BookingActionTypes.FETCH_BOOKINGS_SUCCESS;
  payload: Booking[]; // Adjust payload according to your API response
}

interface FetchBookingsFailureAction {
  type: BookingActionTypes.FETCH_BOOKINGS_FAILURE;
  error: string;
}

export type BookingActionTypes =
  | FetchBookingsRequestAction
  | FetchBookingsSuccessAction
  | FetchBookingsFailureAction;

export const fetchBookingsRequest = (): FetchBookingsRequestAction => ({
  type: BookingActionTypes.FETCH_BOOKINGS_REQUEST,
});

export const fetchBookingsSuccess = (bookings: Booking[]): FetchBookingsSuccessAction => ({
  type: BookingActionTypes.FETCH_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const fetchBookingsFailure = (error: string): FetchBookingsFailureAction => ({
  type: BookingActionTypes.FETCH_BOOKINGS_FAILURE,
  error,
});