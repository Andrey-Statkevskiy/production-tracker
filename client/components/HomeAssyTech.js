import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import ChangePassPage from './ChangePassPage'
import TechnicianDashboard from './TechnicianHelpers/TechnicianDashboard'

/**
 * COMPONENT
 */
export const HomeAssyTech = props => {
  const {username, activeSession } = props
  const [showChangePassForm, setShowChangePassForm] = useState(false);
  const [changePassMsg, setChangePassMsg] = useState(null)
  const isTechWorking = !!activeSession
    
  const handleChangePass = (reason) => {
    if (reason === 'pass changed') {
    setChangePassMsg('Password changed successfully')
  } else if (reason === 'pressed cancel') {
    setChangePassMsg('Password change cancelled')
  }
    setTimeout(() => setChangePassMsg(null), 2000)
    setShowChangePassForm(false)
  }

  useEffect(() => {
    if (isTechWorking && showChangePassForm) {
      setShowChangePassForm(false)
    }
  }, [isTechWorking])

  return (
    <div>
      <h3>Welcome, {username}</h3>

      {!isTechWorking && (
        <button onClick={() => setShowChangePassForm(true)}>
          Change Password
        </button>
      )}
      {showChangePassForm && (
        <ChangePassPage
          onAnyBtnClick={handleChangePass}
        />
      )}
      {changePassMsg && <div>{changePassMsg}</div>}

      <TechnicianDashboard />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    activeSession: state.session.activeSession
  }
}

export default connect(mapState)(HomeAssyTech)
