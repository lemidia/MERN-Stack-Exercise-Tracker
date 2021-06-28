import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
        setExercise({
          ...exercise,
          username: "a",
        });
      }
    });
  }, []);

  const handleUsername = (e) => {
    setExercise({
      ...exercise,
      username: e.target.value,
    });
  };

  const handleDescription = (e) => {
    setExercise({
      ...exercise,
      description: e.target.value,
    });
  };

  const handleDuration = (e) => {
    setExercise({
      ...exercise,
      duration: e.target.value,
    });
  };

  const handleDate = (date) => {
    setExercise({
      ...exercise,
      date: date,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    //Let users go back to homepage
    window.location = "/";
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={handleUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={handleDescription}
          />
        </div>
        <div className="form-group mb-3">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={handleDuration}
          />
        </div>
        <div className="form-group mb-3">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={handleDate} />
          </div>
        </div>

        <div className="form-group mb-3">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
