import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTargets, updateSingleTarget } from "../../store/targets";
import "./HomeLead.css";

export const SetTargets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const targets = useSelector((state) => state.targets.data);

  const [local, setLocal] = useState({
    lvl1: { value: 0, period: "day" },
    lvl2: { value: 0, period: "day" },
    cell: { value: 0, period: "week" },
  });

  // load
  useEffect(() => {
    dispatch(fetchTargets());
  }, [dispatch]);

  // sync redux → local
  useEffect(() => {
    if (!targets) return;

    setLocal({
      lvl1: {
        value: targets.lvl1_value || 0,
        period: targets.lvl1_period || "day",
      },
      lvl2: {
        value: targets.lvl2_value || 0,
        period: targets.lvl2_period || "day",
      },
      cell: {
        value: targets.cell_value || 0,
        period: targets.cell_period || "day",
      },
    });
  }, [targets]);

  const handleChange = (key, field, value) => {
    setLocal((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
    console.log(req.params)
  };

  const handleUpdate = (key) => {
    const payload = {
      value: local[key].value,
      period: local[key].period,
    };

    dispatch(updateSingleTarget(key, payload));
  };

  return (
    <div className="homeLeadContainer">
      {/* LEFT COLUMN */}
      <div className="setTargetsColumn">
        {/* LEVEL 1 */}
        <div className="targetCard">
          <h3>
            Level 1 Target: <br />
            {targets?.lvl1_value ? `${(targets.lvl1_value)} per ${(targets?.lvl1_period)}` : "No target is set"}
            {/* {targets?.lvl1_value} per {targets?.lvl1_period} */}
          </h3>

          <div className="row">
            <input
              type="number"
              value={local.lvl1.value}
              onChange={(e) => handleChange("lvl1", "value", e.target.value)}
            />
            per
            <select
              value={local.lvl1.period}
              onChange={(e) => handleChange("lvl1", "period", e.target.value)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </select>
            <button
              className="btn btn-blue"
              onClick={() => handleUpdate("lvl1")}
            >
              Update
            </button>
          </div>
        </div>

        {/* LEVEL 2 */}
        <div className="targetCard">
          <h3>
            Level 2 Target: <br />
            {targets?.lvl2_value ? `${(targets.lvl2_value)} per ${(targets?.lvl2_period)}` : "No target is set"}
            {/* {targets?.lvl2_value} per {targets?.lvl2_period} */}
          </h3>

          <div className="row">
            <input
              type="number"
              value={local.lvl2.value}
              onChange={(e) => handleChange("lvl2", "value", e.target.value)}
            />
            per
            <select
              value={local.lvl2.period}
              onChange={(e) => handleChange("lvl2", "period", e.target.value)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </select>
            <button
              className="btn btn-blue"
              onClick={() => handleUpdate("lvl2")}
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="setTargetsColumn">
        {/* <div className="targetCard">
          <h3>
            Cell 1 Target: <br />
            {targets?.cell_value} per {targets?.cell_period}
          </h3>

          <div className="row">
            <input
              type="number"
              value={local.cell.value}
              onChange={(e) => handleChange("cell", "value", e.target.value)}
            />
            per
            <select
              value={local.cell.period}
              onChange={(e) => handleChange("cell", "period", e.target.value)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </select>
            <button
              disabled // REMOVE WHEN READY
              className="btn btn-blue"
              onClick={() => handleUpdate("cell")}
            >
              Update
            </button>
          </div>
        </div> */}

        <button
          className="btn btn-red"
          style={{ margin: "7.6em 0px 0px 18em" }}
          onClick={() => navigate("/home")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default SetTargets;
