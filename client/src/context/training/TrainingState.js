import React, { useReducer } from "react";
import TrainingContext from "./TrainingContext";
import TrainingReducer from "./TrainingReducer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_TRAINING,
  DELETE_TRAINING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TRAINING,
  TRAINING_ERROR,
  GET_TRAININGS,
} from "../types";

const TrainingState = (props) => {
  const initalState = {
    trainings: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(TrainingReducer, initalState);

  // Get trainings
  const getTrainings = async () => {
    try {
      const res = await axios.get("/api/trainings/");
      dispatch({ type: GET_TRAININGS, payload: res.data });
    } catch (err) {
      dispatch({ type: TRAINING_ERROR, payload: err.response.msg });
    }
  };

  //Add Training
  const addTraining = async (training) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/trainings", training, config);
      dispatch({ type: ADD_TRAINING, payload: res.data });
    } catch (err) {
      dispatch({ type: TRAINING_ERROR, payload: err.response.msg });
    }
  };

  //Delete Training
  const removeTraining = async (id) => {
    try {
      await axios.delete(`/api/trainings/${id}`);
      dispatch({ type: DELETE_TRAINING, payload: id });
    } catch (err) {
      dispatch({ type: TRAINING_ERROR, payload: err.response.msg });
    }
  };

  //Update training
  const editTraining = async (training) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.put(
        `/api/trainings/${training.id}`,
        training,
        config
      );
      dispatch({ type: UPDATE_TRAINING, payload: res.data });
    } catch (err) {
      dispatch({ type: TRAINING_ERROR, payload: err.response.msg });
    }
  };

  //Set current training
  const setCurrent = async (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear current training
  const clearCurrent = async () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <TrainingContext.Provider
      value={{
        trainings: state.trainings,
        current: state.current,
        error: state.error,
        getTrainings,
        addTraining,
        editTraining,
        removeTraining,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </TrainingContext.Provider>
  );
};

export default TrainingState;
