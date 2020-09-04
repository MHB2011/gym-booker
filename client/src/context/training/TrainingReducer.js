import {
  ADD_TRAINING,
  DELETE_TRAINING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TRAINING,
  TRAINING_ERROR,
  GET_TRAININGS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TRAININGS:
      return { ...state, trainings: action.payload, loading: false };
    case ADD_TRAINING:
      return {
        ...state,
        trainings: [...state.trainings, action.payload],
        loading: false,
      };
    case DELETE_TRAINING:
      return {
        ...state,
        trainings: state.trainings.filter(
          (training) => training._id != action.payload
        ),
        loading: false,
      };
    case UPDATE_TRAINING:
      return {
        ...state,
        trainings: state.trainings.map((training) => {
          if (training._id === action.payload._id) {
            return action.payload;
          } else {
            return training;
          }
        }),
        loading: false,
      };
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case TRAINING_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
