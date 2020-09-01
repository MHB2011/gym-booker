import React, { Fragment } from "react";
import Trainings from "../Trainings/Trainings";

const Home = () => {
  return (
    <Fragment>
      <h2 className="my-3">Next trainings</h2>
      <div className="d-flex flex-column mt-3">
        <Trainings />
      </div>
    </Fragment>
  );
};

export default Home;
