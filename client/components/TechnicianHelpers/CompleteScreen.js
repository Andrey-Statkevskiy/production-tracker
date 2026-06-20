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
import { useDispatch, useSelector } from "react-redux";
import { completeSession } from "../../store/singleSession";

export default function CompleteWork() {
  const dispatch = useDispatch();

  const activeSession = useSelector(state => state.session.activeSession);

  const sessionId = activeSession?.id;

  // Number of rows the user wants to scan
  const [units, setUnits] = useState(0);

  // Array storing scanned serials
  const [rows, setRows] = useState([]);

  // Tracks which row is currently active (focused)
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for input elements (used for programmatic focus control)
  const inputRefs = useRef([]);

  // Stores debounce timers per input (for scanner auto-detection)
  const typingTimeouts = useRef({});


  // =========================
  // CREATE ROWS WHEN UNITS CHANGE
  // =========================
  useEffect(() => {
    if (units > 0) {

      // Initialize empty rows based on user input
      const newRows = Array.from({ length: units }, () => "");

      setRows(newRows);

      // Create refs for each input field (preserve existing refs if possible)
      inputRefs.current = newRows.map(
        (_, i) => inputRefs.current[i] || React.createRef()
      );

      // Reset focus to first row
      setActiveIndex(0);

    } else {
      // Reset state when units is cleared
      setRows([]);
      setActiveIndex(0);
    }
  }, [units]);


  // =========================
  // HANDLE INPUT FOCUS CONTROL
  // =========================
  useEffect(() => {
    if (units > 0 && sessionId) {
      inputRefs.current[activeIndex]?.current?.focus();
    }
  }, [activeIndex, units, sessionId]);


  // =========================
  // HANDLE SCAN INPUT CHANGE (AUTO ADVANCE LOGIC)
  // =========================
  const handleChange = (index, value) => {

    // Update row value in state
    setRows(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    // Clear previous debounce timer for this row
    if (typingTimeouts.current[index]) {
      clearTimeout(typingTimeouts.current[index]);
    }

    // Start debounce timer to detect scan completion
    typingTimeouts.current[index] = setTimeout(() => {

      const trimmed = value?.trim();

      // Ignore empty input
      if (!trimmed) return;

      // Move to next row automatically after scan completion
      setActiveIndex(prev =>
        Math.min(prev + 1, rows.length - 1)
      );

    }, 200); // scanner-friendly delay
  };


  // =========================
  // ENTER KEY FALLBACK SUPPORT
  // =========================
  const handleKeyDown = (index, e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Move to next row on Enter press
      setActiveIndex(prev =>
        Math.min(prev + 1, rows.length - 1)
      );
    }
  };


  // =========================
  // DERIVED STATE: DUPLICATES DETECTION
  // =========================
  const duplicates = rows.filter(
    (item, index) =>
      item && rows.indexOf(item) !== index
  );

  const hasDuplicates = duplicates.length > 0;


  // =========================
  // DERIVED STATE: COMPLETION CHECK
  // =========================
  const allFilled =
    rows.length > 0 &&
    rows.every(v => v.trim() !== "");


  // =========================
  // SUBMIT HANDLER
  // =========================
  const handleSubmit = () => {

    // Prevent submission without valid session
    if (!sessionId) return;

    // Clean data (remove spaces + empty values)
    const cleanedScans = rows
      .map(r => r.trim())
      .filter(Boolean);

    // Validation: must match expected unit count
    if (cleanedScans.length !== units) return;

    // Prevent duplicate serial submission
    if (hasDuplicates) return;

    // Dispatch backend request
    dispatch(completeSession(sessionId, cleanedScans, units));
  };


  // =========================
  // GUARD: NO ACTIVE SESSION
  // =========================
  if (!sessionId) {
    return <div>No active session</div>;
  }


  // =========================
  // RENDER UI
  // =========================
  return (
    <div className="completeScreenContainer">

      {/* Title */}
      <p className="completeScreenTitle">
        Please input amount and scan all case serials
      </p>

      {/* Units input */}
      <input
        className="completedUnitsInput"
        type="number"
        value={units}
        onChange={(e) => setUnits(Number(e.target.value))}
      />

      {/* Initial submit (no scanning required yet) */}
      {units === 0 && (
        <button 
          style={{ marginTop: "15px" }}
          className="btn btn-green"
          onClick={handleSubmit}>
          Complete Run
        </button>
      )}

      {/* Scan table */}
      {units > 0 && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Serial</th>
            </tr>
          </thead>

          <tbody>

            {rows.map((value, index) => {

              // Detect duplicate values
              const isDuplicate =
                value && rows.indexOf(value) !== index;

              return (
                <tr key={index}>

                  {/* Row number */}
                  <td>{index + 1}</td>

                  <td>

                    {/* Scan input */}
                    <input

                      ref={inputRefs.current[index]}
                      // DOM reference for focus control

                      value={value}
                      // controlled input value

                      onChange={(e) =>
                        handleChange(index, e.target.value)
                      }
                      // scan input handler

                      onKeyDown={(e) =>
                        handleKeyDown(index, e)
                      }
                      // Enter fallback navigation

                      style={{
                        border: isDuplicate
                          ? "2px solid red"
                          : "1px solid #ccc"
                      }}
                      // visual duplicate indicator
                    />

                  </td>
                </tr>
              );
            })}

          </tbody>
        </table>
      )}

      {/* Final submit button */}
      {allFilled && !hasDuplicates && (
        <button
          style={{ marginTop: "15px" }}
          className="btn btn-green"
          onClick={handleSubmit}>
          Complete Run
        </button>
      )}

      {/* Duplicate warning */}
      {hasDuplicates && (
        <p style={{ color: "red" }}>
          Duplicate serials detected
        </p>
      )}

    </div>
  );
}