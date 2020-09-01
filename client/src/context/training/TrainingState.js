import React, { useReducer } from "react";
import uuid from "uuid";
import TrainingContext from "./TrainingContext";
import TrainingReducer from "./TrainingReducer";
import {
  ADD_TRAINING,
  DELETE_TRAINING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TRAINING,
  FILTER_TRAINING,
  CLEAR_FILTER,
} from "../types";

const TrainingState = (props) => {
  const initalState = {
    trainings: [
      {
        id: 1,
        name: " Training 1",
        category: "crossfit",
        description: "bla bla 1",
        date: "02-02-2020",
        max_people: 16,
      },
      {
        id: 2,
        name: " Training 2",
        category: "barbel",
        description: "bla bla 2",
        date: "02-02-2020",
        max_people: 10,
      },
      {
        id: 3,
        name: " Training 3",
        category: "gym",
        description: "bla bla 3",
        date: "02-03-2020",
        max_people: 20,
      },
    ],
  };

  const [state, dispatch] = useReducer(TrainingReducer, initalState);

  //Add Training

  //Delete Training

  //Set current training

  //Clear current training

  //Update training

  //Filter training

  //Clear filter

  return (
    <TrainingContext.Provider value={{ trainings: state.trainings }}>
      {props.children}
    </TrainingContext.Provider>
  );
};

export default TrainingState;
