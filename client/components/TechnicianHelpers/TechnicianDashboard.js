import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchActiveSession } from '../../store/sessions'

import StartScreen from './StartScreen'
import WorkScreen from './WorkScreen'
import CompleteScreen from './CompleteScreen'

const TechnicianDashboard = () => {
  const dispatch = useDispatch()
  const session = useSelector(state => state.session.activeSession)

  const [step, setStep] = useState('IDLE')

  useEffect(() => {
    dispatch(fetchActiveSession())
  }, [])

  useEffect(() => {
    if (session) {
      setStep('IN_PROGRESS')
    } else {
      setStep('IDLE')
    }
  }, [session])

  if (step === 'IDLE') {
    return <StartScreen />
  }

  if (step === 'IN_PROGRESS') {
    return <WorkScreen onFinish={() => setStep('COMPLETE')} />
  }

  if (step === 'COMPLETE') {
    return <CompleteScreen />
  }

  return null
}

export default TechnicianDashboard