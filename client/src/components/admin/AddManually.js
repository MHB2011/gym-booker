import React, { Fragment, useContext, useState } from "react";
import BookingContext from "../../context/booking/BookingContext";
import AlertContext from "../../context/alert/alertContext";
import { useHistory } from "react-router-dom";

const AddManually = ({ trainingid }) => {
  let history = useHistory();
  const bookingContext = useContext(BookingContext);
  const alertContext = useContext(AlertContext);
  const { addBookingManually } = bookingContext;
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addBookingManually(trainingid, email);
    history.push(`/training/${trainingid}`);
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="mt-3 mb-2">
      <h4>Add user to this training</h4>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={onChange}
              name="email"
              required
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddManually;
