import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import AdminPanel from "./components/admin/AdminPanel";
import TrainingState from "./context/training/TrainingState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import BookingState from "./context/booking/BookingState";
import TrainingDetails from "./components/Trainings/TrainingDetails";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import NotFound from "./components/pages/NotFound";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <TrainingState>
        <BookingState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <PrivateRoute
                      exact
                      path="/training/:id"
                      component={TrainingDetails}
                    />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <AdminRoute path="/admin" component={AdminPanel} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </BookingState>
      </TrainingState>
    </AuthState>
  );
};

export default App;
