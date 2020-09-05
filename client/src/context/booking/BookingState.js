import React, { useReducer } from "react";
import BookingReducer from "./BookingReducer";
import BookingContext from "./BookingContext";
import axios from "axios";
import {
  GET_BOOKINGS_FOR_TRAINING,
  REMOVE_BOOKING,
  ADD_BOOKING,
  BOOKING_ERROR,
  CLEAR_BOOKING_ERRORS,
} from "../types";

const BookingState = (props) => {
  const initalState = {
    bookings: [],
    error: null,
  };

  const [state, dispatch] = useReducer(BookingReducer, initalState);

  //akcije
  const getBookingsForTraining = async (trainingid) => {
    try {
      const res = await axios.get(
        `/api/bookings/get_bookings_for_training/${trainingid}`
      );

      dispatch({ type: GET_BOOKINGS_FOR_TRAINING, payload: res.data });
    } catch (err) {
      dispatch({ type: BOOKING_ERROR, payload: err.response.data.msg });
    }
  };

  const addBooking = async (trainingid) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        "/api/bookings",
        { training_id: trainingid },
        config
      );
      dispatch({ type: ADD_BOOKING, payload: res.data });
    } catch (err) {
      console.log(err.response);
      dispatch({ type: BOOKING_ERROR, payload: err.response.data.msg });
    }
  };

  const removeBooking = async (userid, trainingid) => {
    let bookingid = null;
    state.bookings.forEach((booking) => {
      if (booking.training_id === trainingid) {
        booking.book.forEach((book) => {
          if (book.id === userid) {
            bookingid = book.bookingid;
          }
        });
      }
    });

    try {
      await axios.delete(`/api/bookings/${bookingid}`);
      dispatch({
        type: REMOVE_BOOKING,
        payload: { userid: userid, trainingid: trainingid },
      });
    } catch (err) {
      dispatch({ type: BOOKING_ERROR, payload: err.response.data.msg });
    }
  };

  const clearbookingErrors = () => {
    dispatch({ type: CLEAR_BOOKING_ERRORS });
  };

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        error: state.error,
        getBookingsForTraining,
        addBooking,
        removeBooking,
        clearbookingErrors,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
