import "./LeaderHelpers/HomeLead.css";
import React, { useState } from "react";
import ControlPanel from "./ControlPanel";

export const HomeLead = () => (
  <div className="homeLeadContainer">
    <ControlPanel />
    <div className="progressContainer">
      <p className="columnTitle">Progress</p>
    </div>
  </div>
);

export default HomeLead;
