import React, { Fragment, useContext, useEffect } from "react";
import TrainingContext from "../../context/training/TrainingContext";
import AuthContext from "../../context/auth/authContext";
import BookingContext from "../../context/booking/BookingContext";
import Bookings from "../bookings/Bookings";
import AdminButtons from "../admin/AdminButtons";

const TrainingDetails = ({ match }) => {
  const authContext = useContext(AuthContext);
  const trainingContext = useContext(TrainingContext);
  const bookingContext = useContext(BookingContext);
  const training_id = match.params.id;
  const { trainings } = trainingContext;

  useEffect(() => {
    authContext.loadUser();
    trainingContext.getTrainings();
    // eslint-disable-next-line
  }, []);

  if (trainings === null) {
    return <h5 className="mt-5">No details</h5>;
  }

  let current_training = trainings.filter((training) => {
    if (training._id == training_id) {
      return true;
    }
  });

  if (current_training.length < 1) {
    return <h5 className="mt-5">No details</h5>;
  } else {
    current_training = current_training[0];
  }

  const { name, category, description, max_people } = current_training;
  const { user, isAdmin } = authContext;
  const user_id = user._id;

  let already_reserved = 0;
  let progress = "0%";
  bookingContext.bookings.forEach((booking) => {
    if (booking.training_id === training_id) {
      already_reserved = booking.book.length;
      progress = parseFloat((already_reserved / max_people) * 100);
      progress = `${progress}%`;
    }
  });

  return (
    <Fragment>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-7">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-10 p-0">
                  <div className="w-100 d-flex justify-content-between">
                    <div className="naslov d-flex align-items-start">
                      <h1 className="mr-2">{name}</h1>
                      {isAdmin ? (
                        <AdminButtons training={current_training} />
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 p-0">
                  <div className="category-div">
                    <div className="badge badge-primary">{category}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <p className="font-weight-bold mb-0">
                  Max people: {max_people}
                </p>
              </div>
              <div className="row">
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
              </div>
              <div className="row my-3">{description}</div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="bookings w-100">
              <button
                className="btn btn-outline-primary mb-3"
                onClick={() => {
                  bookingContext.addBooking(training_id);
                }}
              >
                Reserve
              </button>
              <Bookings
                key={`book-for-${training_id}`}
                trainingid={training_id}
                userid={user_id}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TrainingDetails;
