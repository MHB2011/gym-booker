import React, { useContext } from "react";
import Trainings from "../Trainings/Trainings";
import NewTrainingForm from "./NewTrainingForm";
import EditTrainingForm from "./EditTrainingForm";
import NotFound from "../pages/NotFound";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useRouteMatch,
} from "react-router-dom";
import TrainingContext from "../../context/training/TrainingContext";
import TrainingDetails from "../Trainings/TrainingDetails";

const AdminTrainings = () => {
  const trainingContext = useContext(TrainingContext);
  let match = useRouteMatch();

  const onAddTrainingClick = () => {
    trainingContext.clearCurrent();
  };

  return (
    <Router>
      <div>
        <div className="mb-2 d-block justify-content-end">
          <Link
            to={`${match.url}/add_training`}
            className="btn btn-success btn-circle add-training"
            onClick={onAddTrainingClick}
          >
            <i className="fas fa-plus"></i>
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
            <Route exact path="/training/:id" component={TrainingDetails} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default AdminTrainings;
