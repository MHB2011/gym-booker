import React, { Fragment, useState, useContext, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { hr } from "date-fns/esm/locale";
import TrainingContext from "../../context/training/TrainingContext";
import AlertContext from "../../context/alert/alertContext";

const NewTrainingForm = (props) => {
  const trainingContext = useContext(TrainingContext);
  const alertContext = useContext(AlertContext);

  const { addTraining } = trainingContext;

  registerLocale("hr", hr);

  const [formState, setForm] = useState({
    name: "",
    category: "",
    description: "",
    date: setHours(setMinutes(new Date(), 30), 16),
    max_people: "",
  });

  const { name, category, description, date, max_people } = formState;

  const onSubmit = (e) => {
    e.preventDefault();
    addTraining(formState);
    setForm({
      name: "",
      category: "",
      description: "",
      date: setHours(setMinutes(new Date(), 30), 16),
      max_people: "",
    });

    props.history.push("/admin/trainings");

    alertContext.setAlert("Succesfully added new training", "success");
  };

  const onChange = (e) =>
    setForm({ ...formState, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h5 className="mb-4">Add New Training</h5>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="datetime">Starts at</label>
          <DatePicker
            locale="hr"
            className="form-control"
            name="date"
            selected={date}
            onChange={(date) => setForm({ ...formState, date: date })}
            dateFormat="dd/MM/yyyy HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            showTimeSelect
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Training Name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            className="form-control"
            type="text"
            name="category"
            id="category"
            placeholder="Training Type"
            value={category}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="max_people">Max number of people</label>
          <input
            className="form-control"
            type="number"
            name="max_people"
            id="max_people"
            placeholder="Number of people"
            value={max_people}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            type="number"
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            rows="5"
            onChange={onChange}
            required
          ></textarea>
        </div>
        <input
          className="btn btn-block btn-success"
          type="submit"
          value="Add"
        />
      </form>
    </Fragment>
  );
};

export default NewTrainingForm;
