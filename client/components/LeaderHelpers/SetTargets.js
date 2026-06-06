import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTargets, updateSingleTarget } from "../../store/targets";
import "./HomeLead.css";

const LEVELS = [
  { level: 1, label: "Level 1" },
  { level: 2, label: "Level 2" },
];

export const SetTargets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const targets = useSelector((state) => state.targets.targets);

  useEffect(() => {
    dispatch(fetchTargets());
  }, [dispatch]);

  // map: level -> target
  const safeTargets = Array.isArray(targets) ? targets : [];
  const targetsMap = useMemo(() => {
    return Object.fromEntries(safeTargets.map((t) => [t.level, t]));
  }, [safeTargets]);

  // local draft state (ONLY for editing)
  const [draft, setDraft] = useState({});

  // sync draft when redux changes
  useEffect(() => {
    setDraft((prev) => {
      const next = { ...prev };

      LEVELS.forEach(({ level }) => {
        next[level] = {
          value: targetsMap[level]?.value ?? prev[level]?.value ?? "",
          period: targetsMap[level]?.period ?? prev[level]?.period ?? "day",
        };
      });

      return next;
    });
  }, [targetsMap]);

  const handleChange = (level, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        [field]: value,
      },
    }));
  };

  const handleUpdate = (level) => {
    dispatch(
      updateSingleTarget(level, {
        value: Number(draft[level].value),
        period: draft[level].period,
      }),
    );
  };

  const getDisplayText = (level) => {
    const target = targetsMap[level];

    if (!target) return "No target is set";

    return `${target.value} per ${target.period}`;
  };

  return (
    <div className="setTargetsContainer">
      {LEVELS.map(({ level, label }) => (
        <div key={level} className="targetCard">
          {/* LIVE Redux display (source of truth) */}
          <h3>
            {label} Target: <br />
            {getDisplayText(level)}
          </h3>

          {/* Editor (local state only for typing) */}
          <div className="row">
            <input
              type="number"
              value={draft[level]?.value ?? ""}
              onChange={(e) => handleChange(level, "value", e.target.value)}
            />
            per
            <select
              value={draft[level]?.period ?? "day"}
              onChange={(e) => handleChange(level, "period", e.target.value)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </select>

            <button
              className="btn btn-blue"
              onClick={() => handleUpdate(level)}
            >
              Update
            </button>
          </div>
        </div>
      ))}

      <button className="btn btn-red" onClick={() => navigate("/home")}>
        Go Back
      </button>
    </div>
  );
};

export default SetTargets;
