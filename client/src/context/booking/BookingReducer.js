import {
  GET_BOOKINGS_FOR_TRAINING,
  REMOVE_BOOKING,
  BOOKING_ERROR,
  ADD_BOOKING,
  CLEAR_BOOKING_ERRORS,
} from "../types";

const removeBooking = (bookings, userid, trainingid) => {
  console.log("removeBooking");

  const filtered_bookings = bookings.map((booking) => {
    if (booking.training_id === trainingid) {
      booking.book = booking.book.filter((book) =>
        book.id === userid ? false : true
      );
      return booking;
    } else {
      return booking;
    }
  });

  console.log(filtered_bookings);

  return filtered_bookings;
};

const setBookings = (current_bookings, payload) => {
  //Search if booking for training already exist in state
  let exist = false;
  current_bookings.forEach((booking) => {
    if (booking.training_id === payload.training_id) {
      exist = true;
    }
  });
  //if not , add it to cuurent state
  if (exist === false) {
    return [...current_bookings, payload];
  } else {
    //else replace it with new data
    const new_arr = current_bookings.map((booking) => {
      if (booking.training_id === payload.training_id) {
        return payload;
      } else {
        return booking;
      }
    });

    return new_arr;
  }
};

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKINGS_FOR_TRAINING:
      return {
        ...state,
        bookings: setBookings(state.bookings, action.payload),
      };
    case ADD_BOOKING:
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.training_id === action.payload.training
            ? {
                training_id: booking.training_id,
                book: [
                  ...booking.book,
                  {
                    bookingid: action.payload._id,
                    id: action.payload.user,
                    name: action.payload.name,
                  },
                ],
              }
            : booking
        ),
      };
    case REMOVE_BOOKING:
      return {
        ...state,
        bookings: removeBooking(
          state.bookings,
          action.payload.userid,
          action.payload.trainingid
        ),
      };
    case BOOKING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_BOOKING_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
