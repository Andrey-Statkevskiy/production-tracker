import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./HomeLead.css";

export const ResetProgress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="resetProgressContainer">
      <p className="resetProgressTitle">
        Are you sure you
        <br />
        want to reset progress?
      </p>
      <button className="btn btn-blue" onClick={() => console.log("hit yes")}>
        Yes
      </button>
      <button className="btn btn-red" onClick={() => navigate("/home")}>
        Go Back
      </button>
    </div>
  );
};

export default ResetProgress;
