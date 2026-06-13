import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/users";
import "./HomeLead.css";

export const ViewAllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.users) ?? [];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="AllUsersMainContainer">
      <p className="columnTitle">All Users</p>
      <div className="usersContainer">
        {users?.map(({ id, username, employeeId, role }, i) => (
          <div key={i} className="IndividualUserContainer">
            {id}, {username}
          </div>
        ))}
      </div>
      <button className="btn btn-red" onClick={() => navigate("/home")}>
        Go Back
      </button>
    </div>
  );
};

export default ViewAllUsers;
