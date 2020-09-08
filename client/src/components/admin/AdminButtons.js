import React, { useContext } from "react";
import TrainingContext from "../../context/training/TrainingContext";
import { Link } from "react-router-dom";

const AdminButtons = ({ training }) => {
  const trainingContext = useContext(TrainingContext);
  const { _id } = training;
  const { removeTraining, setCurrent, clearCurrent } = trainingContext;

  const onDelete = (e) => {
    e.preventDefault();
    clearCurrent();
    removeTraining(e.target.id);
  };

  return (
    <div>
      <div className="admin-buttons d-flex ml-2">
        <Link
          to="/admin/trainings/edit_training"
          className="mt-2 mr-2"
          onClick={() => setCurrent(training)}
        >
          <i className="far fa-edit p-2"></i>
        </Link>
        <a href="/" className="mt-2 mr-2" onClick={onDelete} id={_id}>
          <i id={_id} className="far fa-trash-alt p-2"></i>
        </a>
      </div>
    </div>
  );
};

export default AdminButtons;
