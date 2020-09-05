import React, { useContext } from "react";
import BookingContext from "../../context/booking/BookingContext";

const BookingItem = ({ book_data, num, userid, trainingid }) => {
  const bookingContext = useContext(BookingContext);
  const { removeBooking } = bookingContext;

  return (
    <tr>
      <th scope="row">{num + 1}</th>
      <td>{book_data.name}</td>

      <td className="remove-reservation-td">
        {userid == book_data.id ? (
          <i
            onClick={() => removeBooking(userid, trainingid)}
            className="fas fa-trash-alt"
          ></i>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default BookingItem;
