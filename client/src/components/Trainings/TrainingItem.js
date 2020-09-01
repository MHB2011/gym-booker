import React from "react";
import { Link } from "react-router-dom";

const TrainingItem = ({ training }) => {
  const { id, name, date, description, max_people } = training;
  let category = training.category;

  category = category.charAt(0).toUpperCase() + category.slice(1);

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
                to={`training/${id}`}
                className="btn btn-sm btn-outline-primary mt-2"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingItem;
