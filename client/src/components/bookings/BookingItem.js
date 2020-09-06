import React, { useContext } from "react";
import BookingContext from "../../context/booking/BookingContext";
import AuthContext from "../../context/auth/authContext";

const BookingItem = ({ book_data, num, userid, trainingid }) => {
  const bookingContext = useContext(BookingContext);
  const authContext = useContext(AuthContext);
  const { isAdmin } = authContext;
  const { removeBooking } = bookingContext;

  return (
    <tr>
      <th scope="row">{num + 1}</th>
      <td>{book_data.name}</td>

      <td className="remove-reservation-td">
        {userid == book_data.id || isAdmin ? (
          <i
            onClick={() => removeBooking(book_data.id, trainingid)}
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
