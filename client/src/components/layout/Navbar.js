import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { logout, user, isAuthenticated } = authContext;
  let history = useHistory();
  const location = useLocation();
  let renderBack;

  location.pathname == "/login" || location.pathname == "/register"
    ? (renderBack = false)
    : (renderBack = true);

  const onLogout = () => {
    logout();
  };

  const adminLinks = (
    <Fragment>
      <li>
        <Link to="/admin" className="nav-link">
          <i className="fas fa-users-cog" /> Admin
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/about" className="nav-link">
          About
        </Link>
      </li>
      <li>
        <a onClick={onLogout} className="nav-link">
          <i className="fas fa-sign-out-alt" />
          <span className="logout hide-sm">Logout</span>
        </a>
      </li>
      {user && user.admin == 1 ? adminLinks : ""}
      <li className="d-none d-md-flex">
        <a className="nav-link">
          <span> Hello,{user && user.name}</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <div className="container">
        {renderBack ? (
          <i className="fas fa-arrow-left" onClick={() => history.goBack()} />
        ) : null}

        <Link to="/" className="navbar-brand ml-3">
          <i className={icon} /> GymBooker
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#NAVtogler"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="NAVtogler" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "GymBooker",
  icon: "fas fa-dumbbell",
};

export default Navbar;
