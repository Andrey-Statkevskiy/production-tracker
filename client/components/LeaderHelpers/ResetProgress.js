import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomeLead.css";

export const ResetProgress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const handleReset = async () => {
    try {
      setLoading(true);

      await delay(1500);

      await axios.post(
        "/api/targets/progress/reset",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      navigate("/home");
    } catch (err) {
      console.error("Reset failed:", err);
      alert("Failed to reset progress");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetProgressContainer">
      <p className="resetProgressTitle">
        Are you sure you
        <br />
        want to reset progress?
      </p>

      <button
        className="btn btn-blue"
        onClick={handleReset}
        disabled={loading}
      >
        {loading ? "Resetting..." : "Yes"}
      </button>

      <button
        className="btn btn-red"
        onClick={() => navigate("/home")}
      >
        Go Back
      </button>
    </div>
  );
};

export default ResetProgress;