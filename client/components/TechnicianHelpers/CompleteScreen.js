import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { completeSession } from '../../store/sessions'

const CompleteScreen = () => {
  const dispatch = useDispatch()
  const [units, setUnits] = useState(0)

  const handleSubmit = () => {
    dispatch(completeSession(units))
  }

  return (
    <div>
      <h2>Complete Work</h2>

      <input
        type="number"
        min="0"
        value={units}
        onChange={e => setUnits(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>Complete Run</button>
    </div>
  )
}

export default CompleteScreen