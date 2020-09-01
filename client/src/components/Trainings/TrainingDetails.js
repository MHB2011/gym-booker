import React, { Fragment, useContext, useEffect } from "react";
import TrainingContext from "../../context/training/TrainingContext";
import AuthContext from "../../context/auth/authContext";

const TrainingDetails = ({ match }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const trainingContext = useContext(TrainingContext);
  const training_id = match.params.id;
  const trainings = trainingContext.trainings;

  // Check to see if training exists
  // eslint-disable-next-line
  const current_training = trainings.filter((training) => {
    // eslint-disable-next-line
    if (training.id == training_id) {
      return true;
    }
  })[0];

  const { name, category, description, max_people } = current_training;

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
          <p>Bookings for this training</p>
          <button className="btn btn-outline-primary">Book now</button>
        </div>
      </div>
    </Fragment>
  );
};

export default TrainingDetails;
