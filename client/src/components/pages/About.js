import React from "react";

const About = () => {
  return (
    <div className="my-3">
      <h1>About</h1>
      <p className="my-1">
        This is a full stack React app for booking your training in the gym.
        Since COVID-19 pandemic every gym in my Country have limited number of
        spots for group trainings. This app should help reserve your spot for
        next training instead of sending an email and asking to reserve a spot
        every other day. It should also provide training description and some
        other details about the training.
      </p>
      <p className="bg-dark p-2 text-light my-3">
        <strong>Version 1.0.0</strong>
      </p>
    </div>
  );
};

export default About;
