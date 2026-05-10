import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startSession } from '../../store/sessions'

const StartScreen = () => {
  const dispatch = useDispatch()

  const [station, setStation] = useState('1-1')
  const [level, setLevel] = useState(1)

  const handleStart = () => {
    dispatch(startSession(station, level))
  }

  return (
    <div>
      <h2>Start Work</h2>

      <div>
        <label>Station:</label>
        <select value={station} onChange={e => setStation(e.target.value)}>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={`1-${i + 1}`}>
              {`1-${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Level:</label>
        <select value={level} onChange={e => setLevel(Number(e.target.value))}>
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
        </select>
      </div>

      <button onClick={handleStart}>Start</button>
    </div>
  )
}

export default StartScreen