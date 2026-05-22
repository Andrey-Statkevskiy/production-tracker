import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

const WorkScreen = ({ onFinish }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(true)
  const session = useSelector(state => state.session.activeSession)

  const instructionsByLevel = {
    1: ["Check power", "Verify cables", "Run diagnostics"],
    2: ["Open casing", "Inspect PCB", "Replace parts"],
  }

  const instructions = instructionsByLevel[session?.level] || []

  return (
    <>
      <div className={`workScreenContainer ${isPdfOpen ? 'open' : 'collapsed'}`}>
        <div className="left-instructions-panel">
          <h2>Instructions</h2>

          <ul>
            {instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          <button onClick={onFinish}>Finish</button>
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