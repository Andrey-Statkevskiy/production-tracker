import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import './AssemblyChecklist.scss'

const WorkScreen = ({ onFinish }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(true)
  const session = useSelector(state => state.session.activeSession)

  const instructionsByLevel = {
    1: ["Initial Inspection", "Install RF Gasket", "Install LED Pipe", "Install Battery Connector", "Install Power Board", "Install Side Connectors", "Final Inspection"],
    2: ["Initial Inspection", "Install Video Connector", "Install GPS Connector", "Install RF Antenna Connectors", "Install Rotary Switch", "Install LED Retainer", "Final Inspection"],
  }

  const instructions = instructionsByLevel[session?.level] || []

  return (
    <>
      <div className={`workScreenContainer ${isPdfOpen ? 'open' : 'collapsed'}`}>
        <div className="left-instructions-panel">
          <h2>Assembly Steps</h2>

          <div className="checklist">
            {instructions.map((step, i) => {
              const id = `step-${i}`;

              return (
                <React.Fragment key={id}>
                  <input type="checkbox" id={id} />
                  <label htmlFor={id}>{step}</label>
                </React.Fragment>
              );
            })}
          </div>

          <button className='btn btn-blue' onClick={onFinish}>
            Submit Work
          </button>
        </div>
        <div className="collapse-handle" onClick={() => setIsPdfOpen(v => !v)}>
          ▶
        </div>
        <div className="pdf-panel">
          <iframe src="/Gratt,Katrin W2_2026-01-14.pdf" />
        </div>
      </div>
    </>
  )
}

export default WorkScreen