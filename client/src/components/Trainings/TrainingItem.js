import React, { useContext, useEffect } from "react";
import AdminButtons from "../admin/AdminButtons";
import AuthContext from "../../context/auth/authContext";
import TrainingContext from "../../context/training/TrainingContext";
import BookingContext from "../../context/booking/BookingContext";
import { Link } from "react-router-dom";
import moment from "moment";

const TrainingItem = ({ training }) => {
  const authContext = useContext(AuthContext);
  const trainingContext = useContext(TrainingContext);
  const bookingContext = useContext(BookingContext);

  const { isAdmin } = authContext;
  const { _id, name, description, max_people } = training;

  useEffect(() => {
    bookingContext.getBookingsForTraining(_id);
  }, []);

  let date = new Date(training.date);
  const date_from_now = moment(date, "DD-MM-YYYY").fromNow();
  let date_hours = moment(date).format("HH:mm");
  date_hours == "Invalid date" ? (date_hours = "") : (date_hours = date_hours);

  date = `${date_from_now} ${date_hours}`;

  let category = training.category;

  category = category.charAt(0).toUpperCase() + category.slice(1);

  let already_reserved = 0;
  let progress = "0%";
  bookingContext.bookings.forEach((booking) => {
    if (booking.training_id === _id) {
      already_reserved = booking.book.length;
      progress = parseFloat((already_reserved / max_people) * 100);
      progress = `${progress}%`;
    }
  });

  return (
    <Link to={`/training/${_id}`} className="link-training">
      <div className="mb-3 p-2 card">
        <div className="card-body">
          <div className="card-title d-flex justify-content-between align-items-end my-0 py-0">
            <div className="card-subtitle my-0 py-0 text-muted">
              <div>
                <i className="far fa-clock"></i> {date}
              </div>
            </div>
            <div className="badge badge-primary">{category}</div>
          </div>

          <div className="d-flex align-items-end">
            <h4 className="font-weight-bold mb-0 mr-2">{name}</h4>
          </div>

          <div className="progress w-100">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: progress }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="card-text mt-3">
            <div>{description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrainingItem;
