import React, { Fragment, useContext } from "react";
import TrainingContext from "../../context/training/TrainingContext";

const TrainingDetails = ({ match }) => {
  const trainingContext = useContext(TrainingContext);
  const training_id = match.params.id;
  const trainings = trainingContext.trainings;
  console.log(trainings);
  // Check to see if training exists
  const current_training = trainings.filter((training) => {
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
