import React, { Fragment } from "react";
import Trainings from "../Trainings/Trainings";
import AuthContext from "../../context/auth/authContext";
import { useContext, useEffect } from "react";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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
