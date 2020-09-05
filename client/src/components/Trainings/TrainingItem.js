import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import TrainingContext from "../../context/training/TrainingContext";
import moment from "moment";

const TrainingItem = ({ training }) => {
  const authContext = useContext(AuthContext);
  const trainingContext = useContext(TrainingContext);
  const { removeTraining, setCurrent, clearCurrent } = trainingContext;

  const { isAdmin } = authContext;
  const { _id, name, description, max_people } = training;

  let date = new Date(training.date);
  const date_from_now = moment(date, "DD-MM-YYYY").fromNow();
  let date_hours = moment(date).format("HH:mm");
  date_hours == "Invalid date" ? (date_hours = "") : (date_hours = date_hours);

  date = `${date_from_now} ${date_hours}`;

  let category = training.category;

  category = category.charAt(0).toUpperCase() + category.slice(1);

  const onDelete = (e) => {
    e.preventDefault();
    clearCurrent();
    removeTraining(e.target.id);
  };

  const AdminButtons = () => {
    return (
      <div className="admin-buttons d-inline-block ml-2">
        <Link
          to="/admin/trainings/edit_training"
          className="btn btn-sm btn-outline-secondary mt-2 mr-2"
          onClick={() => setCurrent(training)}
        >
          Edit
        </Link>
        <a
          href="/"
          className="btn btn-sm btn-outline-danger mt-2 mr-2"
          onClick={onDelete}
          id={_id}
        >
          Remove
        </a>
      </div>
    );
  };

  return (
    <div className="mb-3 p-2 card">
      <div className="card-body">
        <div className="card-title d-flex justify-content-between align-items-center">
          <div className="font-weight-bold ">{name}</div>
          <div className="badge badge-primary">{category}</div>
        </div>

        <div className="card-subtitle mb-2 text-muted">
          <div>
            <i className="far fa-clock"></i> {date}
          </div>
        </div>
        <div className="card-text">
          <div>{description}</div>
          <div>Max People: {max_people}</div>
          <div className="list-group">
            <div className="buttons">
              <Link
                to={`/training/${_id}`}
                className="btn btn-sm btn-outline-primary mt-2"
              >
                View
              </Link>
              {isAdmin ? <AdminButtons /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingItem;
