import "./LeaderHelpers/HomeLead.css";
import React, { useState } from "react";
import ControlPanel from "./ControlPanel";
import ProgressBars from "./LeaderHelpers/ProgressBars";

export const HomeLead = () => (
  <div className="homeLeadContainer">
    <ControlPanel />
    <div className="progressContainer">
      <p className="columnTitle">Progress</p>
      <ProgressBars />
    </div>
  </div>
);

export default HomeLead;
