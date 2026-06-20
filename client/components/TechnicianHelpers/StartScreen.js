import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startSession } from '../../store/singleSession'

const StartScreen = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.session?.error)

  const [station, setStation] = useState('Station')
  const [level, setLevel] = useState(0)
  const [errMsg, setErrMsg] = useState('')
  const availableStations = ['1-3', '1-5', '1-7', '1-9', '1-11']; //lvl1: 1-9, 1-11; lvl2: (1-3), 1-5, 1-7
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
          {availableStations.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select value={level} onChange={e => setLevel(Number(e.target.value))}>
          <option value={0}>Level</option>
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
        </select>
      </div>

      <div>
        <button className='btn btn-green' onClick={handleStart}>Start Run</button>
      </div>
      {errMsg && <p className='errorTxt'>{errMsg}</p>}
      {error && <p className='errorTxt'>{error}</p>}
    </div>
  )
}

export default StartScreen