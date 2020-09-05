import React, { useContext, useEffect, Fragment } from "react";
import BookingContext from "../../context/booking/BookingContext";
import BookingItem from "./BookingItem";
import AlertContext from "../../context/alert/alertContext";

const Bookings = ({ trainingid, userid }) => {
  const alertContext = useContext(AlertContext);
  const bookingContext = useContext(BookingContext);
  const {
    bookings,
    getBookingsForTraining,
    error,
    clearbookingErrors,
  } = bookingContext;

  useEffect(() => {
    if (error !== null) {
      alertContext.setAlert(error, "danger");
      clearbookingErrors();
    }

    getBookingsForTraining(trainingid);
    // eslint-disable-next-line
  }, [error]);

  if (bookings === []) {
    return <h5>No bookings</h5>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) =>
          booking.training_id == trainingid
            ? booking.book.map((book, i) => (
                <BookingItem
                  key={`bookingitem-for-${booking.training_id}-${i}`}
                  book_data={book}
                  num={i}
                  userid={userid}
                  trainingid={trainingid}
                />
              ))
            : null
        )}
      </tbody>
    </table>
  );
};

export default Bookings;
