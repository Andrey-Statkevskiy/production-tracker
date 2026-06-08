import "./HomeLead.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSummary } from "../../store/targets";
import { getColor } from "../utils/getColor";
import { Line } from "@rc-component/progress";

export const ProgressBars = () => {
  const dispatch = useDispatch();

  const summary = useSelector((state) => state.targets.summary) ?? [];

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  const format = (p) =>
    Number.isInteger(p) ? p : Number(p).toFixed(2);

  return (
    <>
      {summary.map((lvl) => (
        <div key={lvl.level} className="progressBarsContainer">
          <h3>
            Level {lvl.level}: {lvl.total}/{lvl.target} ({format(lvl.percent)}%)
          </h3>

          <Line
            percent={lvl.percent}
            strokeColor={getColor(lvl.percent)}
            strokeLinecap="square"
            strokeWidth={3}
          />

          {/* stations */}
          <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
            {lvl.stations.map((st) => (
              <div key={st.station}>
                Station {st.station}: {st.units} ({format(st.percent)}%)

                <Line
                  percent={st.percent}
                  strokeColor={getColor(st.percent)}
                  strokeWidth={2}
                  strokeLinecap="square"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProgressBars;