import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TechnicianDashboard from "./TechnicianHelpers/TechnicianDashboard";
import ControlPanel from "./ControlPanel";
import "./TechnicianHelpers/HomeAssyTech.css"

export const HomeAssyTech = ({ username, activeSession }) => {
  const isTechWorking = !!activeSession;

  // useEffect(() => {
  //   if (isTechWorking && showChangePassForm) {
  //     setShowChangePassForm(false)
  //   }
  // }, [isTechWorking])

  return (
    <div className="homeAssyTechContainer">
      {!isTechWorking && <ControlPanel />}
      <TechnicianDashboard />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    activeSession: state.session.activeSession,
  };
};

export default connect(mapState)(HomeAssyTech);
