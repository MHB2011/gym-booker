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
  ADD_BOOKING_MANUALLY,
} from "../types";

const BookingState = (props) => {
  const initalState = {
    bookings: [],
    error: null,
  };

  const [state, dispatch] = useReducer(BookingReducer, initalState);

  //Get Booking for specific training id
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

  //Add new booking
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
      dispatch({ type: BOOKING_ERROR, payload: err.response.data.msg });
    }
  };

  //Add new booking manually
  const addBookingManually = async (trainingid, email) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        "/api/bookings/add_manually",
        { trainingid: trainingid, email: email },
        config
      );
      dispatch({ type: ADD_BOOKING, payload: res.data });
    } catch (err) {
      dispatch({ type: BOOKING_ERROR, payload: err.response.data.msg });
    }
  };

  //Remove booking by id
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

  //clear errors from state
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
        addBookingManually,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
