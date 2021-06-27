import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [user, setUser] = useState({ username: "" });

  const handleUser = (e) => {
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    //Let users go back to homepage
    setUser({ username: "" });
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={user.username}
            onChange={handleUser}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
