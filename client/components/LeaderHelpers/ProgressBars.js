import "./HomeLead.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTargets, fetchProgress } from "../../store/targets";
import { getColor } from "../utils/getColor";
import { Line } from "@rc-component/progress";

export const ProgressBars = () => {
  const dispatch = useDispatch();

  const targets = useSelector((state) => state.targets.targets) ?? [];
  const progress = useSelector((state) => state.targets.progress) ?? [];

  useEffect(() => {
    dispatch(fetchTargets());
    dispatch(fetchProgress());
  }, [dispatch]);

  const levels = Array.isArray(targets) ? targets.map((t) => t.level) : [];

  return (
    <>
      {levels.map((level) => {
          const formatPercent = (p) => (Number.isInteger(p) ? p : p.toFixed(2));
          const target = targets.find((t) => t.level === level)?.value ?? 0;
          const done = progress.find((p) => p.level === level)?.unitsCount ?? 0;
          const getPercent = () => target ? (done / target) * 100 : 0;
          const percent = getPercent();
        return (
          <div className="progressBarsContainer" key={level}>
            Level {level}: {done}/{target} ({percent}%)
            <Line
              strokeColor={getColor(percent)}
              percent={percent}
              strokeWidth={2}
              strokeLinecap="square"
            />
          </div>
        );
      })}
    </>
  );
};

export default ProgressBars;
