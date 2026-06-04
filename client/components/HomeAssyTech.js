import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TechnicianDashboard from "./TechnicianHelpers/TechnicianDashboard";
import ControlPanel from "./ControlPanel";
import "./TechnicianHelpers/HomeAssyTech.css"

export const HomeAssyTech = ({ username, activeSession }) => {
  const isTechWorking = !!activeSession;

  return (
    <div className="homeAssyTechContainer">
      {!isTechWorking && <ControlPanel />}
      <TechnicianDashboard />
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    activeSession: state.session.activeSession,
  };
};

export default connect(mapState)(HomeAssyTech);
