import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTargets, updateSingleTarget } from "../../store/targets";
import "./HomeLead.css";
import { formatDate } from "../utils/formatDate";

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
  const targetsMap = useMemo(() => {
    return Object.fromEntries(targets.map((t) => [t.level, t]));
  }, [targets]);

  // local draft state (ONLY for editing)
  const [draft, setDraft] = useState({});

  // sync draft when redux changes
  useEffect(() => {
    setDraft(() => {
      const next = {};

      LEVELS.forEach(({ level }) => {
        next[level] = {
          value: targetsMap[level]?.value ?? "",
          startDate: targetsMap[level]?.startDate ?? "",
          endDate: targetsMap[level]?.endDate ?? "",
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
    const startDateFormatted = formatDate(draft[level].startDate);
    const endDateFormatted = formatDate(draft[level].endDate);
    dispatch(
      updateSingleTarget(level, {
        value: Number(draft[level].value),
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      }),
    );
  };

  const getDisplayText = (level) => {
    const target = targetsMap[level];

    if (!target?.value) return "No target is set";

    return `${target.value} from ${formatDate(target.startDate)} to ${formatDate(target.endDate)}`;
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
            starting
            <input
              type="date"
              value={draft[level]?.startDate || ""}
              onChange={(e) => handleChange(level, "startDate", e.target.value)}
            />
            ending
            <input
              type="date"
              value={draft[level]?.endDate || ""}
              onChange={(e) => handleChange(level, "endDate", e.target.value)}
            />
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
