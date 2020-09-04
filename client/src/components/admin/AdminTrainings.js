import React, { useContext } from "react";
import Trainings from "../Trainings/Trainings";
import NewTrainingForm from "./NewTrainingForm";
import EditTrainingForm from "./EditTrainingForm";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useRouteMatch,
} from "react-router-dom";
import TrainingContext from "../../context/training/TrainingContext";

const AdminTrainings = () => {
  const trainingContext = useContext(TrainingContext);
  let match = useRouteMatch();

  const onAddTrainingClick = () => {
    trainingContext.clearCurrent();
    console.log("onAddTrainingClick");
  };

  return (
    <Router>
      <div>
        <div className="p-2 m-2 d-flex flex-wrap">
          <Link to={match.url} className="btn btn-primary mr-3 mb-3">
            Trainings
          </Link>
          <Link
            to={`${match.url}/add_training`}
            className="btn btn-success mr-3 mb-3"
            onClick={onAddTrainingClick}
          >
            Add New Training
          </Link>
        </div>
        <main>
          <Switch>
            <Route exact path={`${match.path}`} component={Trainings} />
            <Route
              exact
              path={`${match.path}/add_training`}
              component={NewTrainingForm}
            ></Route>
            <Route
              exact
              path={`${match.path}/edit_training`}
              component={EditTrainingForm}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default AdminTrainings;
