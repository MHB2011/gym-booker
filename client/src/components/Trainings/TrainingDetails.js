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

  // Check to see if training exists
  // eslint-disable-next-line

  if (trainings === null) {
    return <h5 className="mt-5">No details</h5>;
  }

  const current_training = trainings.filter((training) => {
    // eslint-disable-next-line
    if (training._id == training_id) {
      return true;
    }
  })[0];

  const { name, category, description, max_people } = current_training;
  const { user } = authContext;
  const user_id = user._id;

  return (
    <Fragment>
      <div className="d-flex mt-3">
        <div>
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
          <div className="my-1 p-2">
            <p>
              {description}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae at
              ex quos ratione recusandae optio cumque maxime numquam quis et.
            </p>
          </div>
        </div>
        <div className="bookings w-50">
          <p>Reservations for this training</p>
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
