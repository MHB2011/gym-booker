import React, { Fragment, useContext, useEffect } from "react";
import TrainingContext from "../../context/training/TrainingContext";
import TrainingItem from "./TrainingItem";
import Spinner from "../layout/Spinner";

const Trainings = () => {
  const trainingContext = useContext(TrainingContext);
  const { trainings, getTrainings, loading } = trainingContext;

  useEffect(() => {
    getTrainings();
    // Only at beggining []
    // eslint-disable-next-line
  }, []);

  if (trainings !== null && trainings.length === 0) {
    return <h4>No trainings.</h4>;
  }

  return (
    <Fragment>
      {trainings !== null && !loading ? (
        <Fragment>
          {trainings.map((training) => (
            <TrainingItem key={training._id} training={training} />
          ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Trainings;
