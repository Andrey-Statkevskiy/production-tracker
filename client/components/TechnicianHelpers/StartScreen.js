import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startSession } from '../../store/sessions'

const StartScreen = () => {
  const dispatch = useDispatch()

  const [station, setStation] = useState('Station')
  const [level, setLevel] = useState(0)
  const [errMsg, setErrMsg] = useState('')

  const handleStart = () => {
    if (station === 'Station' || level === 0) {
      setErrMsg('Select level/station and try again')
      return
    }
    dispatch(startSession(station, level))
  }

  return (
    <div className='startScreenContainer'>
      <p className='startScreenTitle'>Please select your station and level for the run</p>

      <div className='startScreenStationLevelDropdowns'>
        <select value={station} onChange={e => setStation(e.target.value)}>
          <option key={0} value={'1-0'}>{'Station'}</option>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={`1-${i + 1}`}>
              {`1-${i + 1}`}
            </option>
          ))}
        </select>

        <select value={level} onChange={e => setLevel(Number(e.target.value))}>
          <option value={0}>Level</option>
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
        </select>
      </div>

      <div>
        <button className='startScreenStartBtn' onClick={handleStart}>Start Run</button>
      </div>
      {errMsg && <p className='startScreenErr'>{errMsg}</p>}

    </div>
  )
}

export default StartScreen