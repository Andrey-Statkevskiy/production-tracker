import React, { useState } from 'react'
import {connect} from 'react-redux'
import ChangePassPage from './ChangePassPage'

/**
 * COMPONENT
 */
export const HomeAssyTech = props => {
  const {username} = props
  const [showChangePassForm, setShowChangePassForm] = useState(false);
  const [changePassMsg, setChangePassMsg] = useState(null)

  const handleChangePass = (reason) => {
    if (reason === 'pass changed') {
    setChangePassMsg('Password changed successfully')
  } else if (reason === 'pressed cancel') {
    setChangePassMsg('Password change cancelled')
  }
    setTimeout(() => setChangePassMsg(null), 2000)
    setShowChangePassForm(false)
  }
  return (
    <div>
      <h3>Welcome, {username}</h3>

      <button onClick={() => setShowChangePassForm(true)}>
        Change Password
      </button>
      {showChangePassForm && (
        <ChangePassPage
          onAnyBtnClick={handleChangePass}
        />
      )}
      {changePassMsg && <div>{changePassMsg}</div>}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(HomeAssyTech)
