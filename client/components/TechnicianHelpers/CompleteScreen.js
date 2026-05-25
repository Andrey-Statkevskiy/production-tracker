// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { completeSession } from '../../store/sessions'

// const CompleteScreen = () => {
//   const dispatch = useDispatch()
//   const [units, setUnits] = useState(0)
//   const [errMsg, setErrMsg] = useState('')


//   const handleSubmit = () => {
//     dispatch(completeSession(units))
//   }

//   return (
//     <div className='completeScreenContainer'>
//       <p className='completeScreenTitle'>Please scan all case serials that you assembled during this run</p>

//       <input
//         type="number"
//         min="0"
//         value={units}
//         onChange={e => setUnits(Number(e.target.value))}
//       />

//       <button className="btn btn-green" onClick={handleSubmit}>Complete Run</button>
//       {errMsg && <p className='startScreenErr'>{errMsg}</p>}

//     </div>
//   )
// }

// export default CompleteScreen

import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { completeSession } from "../../store/sessions";

export default function CompleteWork() {
  const dispatch = useDispatch();

  const [units, setUnits] = useState(0);
  const [rows, setRows] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRefs = useRef([]);
  const typingTimeouts = useRef({});

  // CREATE ROWS
  useEffect(() => {
    if (units > 0) {
      const newRows = Array.from({ length: units }, () => "");
      setRows(newRows);

      inputRefs.current = newRows.map(
        (_, i) => inputRefs.current[i] || React.createRef()
      );

      setActiveIndex(0);
    } else {
      setRows([]);
      setActiveIndex(0);
    }
  }, [units]);

  // FOCUS CONTROL (single source of truth)
  useEffect(() => {
    if (units > 0) {
      inputRefs.current[activeIndex]?.current?.focus();
    }
  }, [activeIndex, units]);

  // AUTO ADVANCE LOGIC (scanner-friendly)
  const handleChange = (index, value) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    // clear previous debounce timer
    if (typingTimeouts.current[index]) {
      clearTimeout(typingTimeouts.current[index]);
    }

    typingTimeouts.current[index] = setTimeout(() => {
      const trimmed = value?.trim();
      if (!trimmed) return;

      setActiveIndex((prev) => {
        if (prev < rows.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 350);
  };

  // ENTER fallback
  const handleKeyDown = (index, e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setActiveIndex((prev) =>
        Math.min(prev + 1, rows.length - 1)
      );
    }
  };

  const allFilled =
    rows.length > 0 && rows.every((v) => v.trim() !== "");

  const handleSubmit = () => {
    dispatch(completeSession(units));
  };

  return (
    <div className="completeScreenContainer">
      <p className="completeScreenTitle">
        Please scan all case serials that you assembled during this run
      </p>

      <input 
        className="completedUnitsInput"
        type="number"
        placeholder="Units completed"
        value={units}
        onChange={(e) => setUnits(Number(e.target.value))}
      />

      {units === 0 && (
        <>
          <button className="btn btn-green" onClick={handleSubmit}>
            Complete Run
          </button>
          {errMsg && <p className="startScreenErr">{errMsg}</p>}
        </>
      )}

      {units > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Scan Code</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    ref={inputRefs.current[index]}
                    value={value}
                    onChange={(e) =>
                      handleChange(index, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {allFilled && (
        <>
          <button className="btn btn-green" onClick={handleSubmit}>
            Complete Run
          </button>
          {errMsg && <p className="startScreenErr">{errMsg}</p>}
        </>
      )}
    </div>
  );
}