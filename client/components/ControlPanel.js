import "./LeaderHelpers/HomeLead.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import SignUpPage from "./SignUpPage";
import ChangePassPage from "./ChangePassPage";
import { useNavigate } from "react-router-dom";

export const ControlPanel = ({ role }) => {
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [showChangePassForm, setShowChangePassForm] = useState(false);
  const [newUserMsg, setNewUserMsg] = useState(null);
  const [changePassMsg, setChangePassMsg] = useState(null);

  const navigate = useNavigate();
  const handleNewUser = (reason) => {
    if (reason === "user created") {
      setNewUserMsg("User created successfully");
    } else if (reason === "pressed cancel") {
      setNewUserMsg("User creation cancelled");
    }
    setTimeout(() => setNewUserMsg(null), 2000);
    setShowNewUserForm(false);
  };

  const handleChangePass = (reason) => {
    if (reason === "pass changed") {
      setChangePassMsg("Password changed successfully");
    } else if (reason === "pressed cancel") {
      setChangePassMsg("Password change cancelled");
    }
    setTimeout(() => setChangePassMsg(null), 2000);
    setShowChangePassForm(false);
  };
  return (
    <div className="controlsContainer">
      <p className="columnTitle">Controls</p>
      {role === "leader" && (
        <div className="leaderOnlyControls">
          <button
            className="btn btn-blue"
            onClick={() => navigate("/home/set-targets")}
          >
            Set Targets
          </button>
          {/* we are no longer resetting progress, we are displaying work done within the target boundaries
          <button
            className="btn btn-blue"
            onClick={() => navigate("/home/reset-progress")}
          >
            Reset Progress
          </button> */}
          <button
            className="btn btn-blue"
            onClick={() => console.log("View All Users Btn clicked")}
          >
            View All Users
          </button>
          <button
            className="btn btn-blue"
            onClick={() => console.log("View/Export Data Btn clicked")}
          >
            View/Export Data
          </button>
          <button
            className="btn btn-blue"
            onClick={() => setShowNewUserForm(true)}
          >
            Create user
          </button>
          {showNewUserForm && <SignUpPage onAnyBtnClick={handleNewUser} />}
          {newUserMsg && <div>{newUserMsg}</div>}
        </div>
      )}
      <button
        className="btn btn-blue"
        onClick={() => setShowChangePassForm(true)}
      >
        Change Password
      </button>
      {showChangePassForm && (
        <ChangePassPage onAnyBtnClick={handleChangePass} />
      )}
      {changePassMsg && <div>{changePassMsg}</div>}
    </div>
  );
};

const mapState = (state) => {
  return {
    role: state.auth?.role,
  };
};

export default connect(mapState)(ControlPanel);
