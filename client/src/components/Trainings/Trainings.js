import React, { Fragment, useContext } from "react";
import TrainingContext from "../../context/training/TrainingContext";
import TrainingItem from "./TrainingItem";

const Trainings = () => {
  const trainingContext = useContext(TrainingContext);
  const { trainings } = trainingContext;

  return (
    <Fragment>
      {trainings.map((training) => (
        <TrainingItem key={training.id} training={training} />
      ))}
    </Fragment>
  );
};

export default Trainings;
