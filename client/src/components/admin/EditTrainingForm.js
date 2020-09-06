import React, { Fragment, useState, useContext, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { hr } from "date-fns/esm/locale";
import TrainingContext from "../../context/training/TrainingContext";
import AlertContext from "../../context/alert/alertContext";
import AddManually from "../admin/AddManually";

const EditTrainingForm = (props) => {
  const trainingContext = useContext(TrainingContext);
  const alertContext = useContext(AlertContext);

  const { editTraining, current } = trainingContext;

  useEffect(() => {
    if (current !== null) {
      setForm({
        id: current._id,
        name: current.name,
        category: current.category,
        description: current.description,
        date: new Date(current.date),
        max_people: current.max_people,
      });
    } else {
      setForm({
        id: "",
        name: "",
        category: "",
        description: "",
        date: setHours(setMinutes(new Date(), 30), 16),
        max_people: "",
      });
    }
  }, [trainingContext, current]);

  registerLocale("hr", hr);

  const [formState, setForm] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    date: setHours(setMinutes(new Date(), 30), 16),
    max_people: "",
  });

  const { name, category, description, date, max_people } = formState;

  const onSubmit = (e) => {
    e.preventDefault();
    editTraining(formState);
    setForm({
      name: "",
      category: "",
      description: "",
      date: setHours(setMinutes(new Date(), 30), 16),
      max_people: "",
    });
    props.history.push("/admin/trainings");
    alertContext.setAlert("Succesfully edited training", "success");
  };

  const onChange = (e) =>
    setForm({ ...formState, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <AddManually trainingid={current._id} />
      <h4 className="mb-2 mt-4">Edit Training</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="datetime">Starts at</label>
          <DatePicker
            locale="hr"
            className="form-control"
            name="date"
            selected={date}
            onChange={(date) => setForm({ ...formState, date: date })}
            dateFormat="MM/dd/yyyy HH:mm"
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
          className="btn btn-block btn-primary"
          type="submit"
          value="Edit"
        />
      </form>
    </Fragment>
  );
};

export default EditTrainingForm;
