import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./HomeLead.css";

export const ViewExportData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   const sessions = useSelector((state) => state.users.users) ?? [];

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

  return (
    <div className="AllUsersMainContainer">
      <p className="columnTitle">View/Export Data</p>
      <button className="btn btn-red" onClick={() => navigate("/home")}>
        Go Back
      </button>
    </div>
  );
};

export default ViewExportData;
