// import "./HomeLead.css";
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchSummary } from "../../store/targets";
// import { getColor } from "../utils/getColor";
// import { Line } from "@rc-component/progress";

// export const ProgressBars = () => {
//   const dispatch = useDispatch();

//   const summary = useSelector((state) => state.targets.summary) ?? [];

//   useEffect(() => {
//     dispatch(fetchSummary());
//   }, [dispatch]);

//   const format = (p) =>
//     Number.isInteger(p) ? p : Number(p).toFixed(2);

//   return (
//     <>
//       {summary.map((lvl) => (
//         <div key={lvl.level} className="progressBarsContainer">
//           <h3>
//             Level {lvl.level}: {lvl.total}/{lvl.target} ({format(lvl.percent)}%)
//           </h3>

//           <Line
//             percent={lvl.percent}
//             strokeColor={getColor(lvl.percent)}
//             strokeLinecap="square"
//             strokeWidth={3}
//           />

//           {/* stations */}
//           <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
//             {lvl.stations.map((st) => (
//               <div key={st.station}>
//                 Station {st.station}: {st.units} ({format(st.percent)}%)

//                 <Line
//                   percent={st.percent}
//                   strokeColor={getColor(st.percent)}
//                   strokeWidth={2}
//                   strokeLinecap="square"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default ProgressBars;

import "./HomeLead.css";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSummary } from "../../store/targets";
import { getColor } from "../utils/getColor";
import { Line } from "@rc-component/progress";

export const ProgressBars = () => {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.targets.summary) ?? [];

  // гupdate interval (ms)
  const [intervalMs, setIntervalMs] = useState(60000); // default 1 min
  const intervalRef = useRef(null);

  // time since last update
  const [lastUpdated, setLastUpdated] = useState(null);

  const format = (p) => (Number.isInteger(p) ? p : Number(p).toFixed(2));

  const fetchData = async () => {
    await dispatch(fetchSummary());
    setLastUpdated(new Date());
  };

  // component mount + interval
  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(() => {
      fetchData();
    }, intervalMs);

    return () => clearInterval(intervalRef.current);
  }, [intervalMs]); // rerender interval after it is changed

  const handleIntervalChange = (e) => {
    const value = Number(e.target.value);
    setIntervalMs(value);
  };

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
            strokeWidth={2}
          />

          {/* stations */}
          <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
            {lvl.stations.map((st) => (
              <div key={st.station}>
                <div>
                  Station {st.station}: {st.units} ({format(st.percent)}%)
                </div>

                <Line
                  percent={st.percent}
                  strokeColor={getColor(st.percent)}
                  strokeWidth={1}
                  strokeLinecap="square"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="progressBarsRefresh">
        <p>Auto-refresh:</p>
        <select value={intervalMs} onChange={handleIntervalChange}>
          <option value={20000}>20 sec</option>
          <option value={30000}>30 sec</option>
          <option value={60000}>1 min</option>
          <option value={120000}>2 min</option>
          <option value={300000}>5 min</option>
        </select>
        <br />
        <button onClick={fetchData} className="btn btn-green">
          Refresh
        </button>
        <div style={{ marginTop: "5px", fontSize: "12px", color: "gray" }}>
          Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "—"}
        </div>
      </div>
    </>
  );
};

export default ProgressBars;
