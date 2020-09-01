import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container">
        <h1 href="index.html" className="navbar-brand">
          <i className={icon} /> GymBooker
        </h1>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#NAVtogler"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="NAVtogler" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
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
