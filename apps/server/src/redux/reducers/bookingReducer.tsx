import { BookingActionTypes } from '../actions/actionTypes/bookingActionTypes';
import { Booking } from '../actions/bookingActions'; // Assuming your booking type is defined here

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingReducer = (state = initialState, action: BookingActionTypes): BookingState => {
  switch (action.type) {
    case BookingActionTypes.FETCH_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case BookingActionTypes.FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case BookingActionTypes.FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default bookingReducer;
