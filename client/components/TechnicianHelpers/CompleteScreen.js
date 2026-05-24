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
    <div className='completeScreenContainer'>
      <p className='completeScreenTitle'>Please scan all case serials that you assembled during this run</p>

      <input
        type="number"
        min="0"
        value={units}
        onChange={e => setUnits(Number(e.target.value))}
      />

      <button className="btn btn-green" onClick={handleSubmit}>Complete Run</button>
    </div>
  )
}

export default CompleteScreen