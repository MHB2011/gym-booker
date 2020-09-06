import React, { Fragment, useContext, useEffect } from "react";
import TrainingContext from "../../context/training/TrainingContext";
import AuthContext from "../../context/auth/authContext";
import BookingContext from "../../context/booking/BookingContext";
import Bookings from "../bookings/Bookings";

const TrainingDetails = ({ match }) => {
  const authContext = useContext(AuthContext);
  const trainingContext = useContext(TrainingContext);
  const bookingContext = useContext(BookingContext);
  const training_id = match.params.id;
  const trainings = trainingContext.trainings;

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
  const { user } = authContext;
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
      <div className="d-flex mt-3 flex-wrap">
        <div className="w-100">
          <div className="d-flex align-items-center">
            <div>
              <h1 className="mb-0">{name}</h1>
            </div>
            <div>
              <div className="badge badge-primary ml-3">{category}</div>
            </div>
          </div>
          <div>
            <p className="font-weight-bold p-2">Max people: {max_people}</p>
          </div>
          <div className="mr-3">
            <div className="progress">
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
          <div className="my-1 p-2">
            <p>{description}</p>
          </div>
        </div>
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
    </Fragment>
  );
};

export default TrainingDetails;
