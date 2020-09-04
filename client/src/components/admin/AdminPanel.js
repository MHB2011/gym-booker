import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import AdminUsers from "./AdminUsers";
import AdminTrainings from "./AdminTrainings";

const AdminPanel = () => {
  let match = useRouteMatch();

  return (
    <Router>
      <div className="mt-3">
        <h1>Admin panel</h1>
        <div className="admin-header my-3 p-2">
          <Link
            to={`${match.url}/users`}
            className="item-admin-header-users p-2 d-flex align-items-center "
          >
            <i className="fas fa-users fa-3x mr-2"></i> <h5>Users</h5>
          </Link>
          <Link
            to={`${match.url}/trainings`}
            className="item-admin-header-trainings p-2 d-flex align-items-center"
          >
            <i className="fas fa-dumbbell fa-3x mr-2"></i> <h5>Trainings</h5>
          </Link>
        </div>
        <main className="admin-main my-3 p-2">
          <Switch>
            <Route
              exact
              path={match.path}
              render={() => (
                <h5>
                  Welcome to Admin panel. Here you can manage users and
                  trainings as you wish. Simply click on icon to start.
                </h5>
              )}
            />
            <Route exact path={`${match.path}/users`} component={AdminUsers} />
            <Route
              path={`${match.path}/trainings`}
              component={AdminTrainings}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default AdminPanel;
