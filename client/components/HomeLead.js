import React, { useState } from 'react'
import {connect} from 'react-redux'
import SignUpPage from './SignUpPage'
import ChangePassPage from './ChangePassPage'

/**
 * COMPONENT
 */
export const HomeLead = props => {
  const {username} = props // приходит из mapstate
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [showChangePassForm, setShowChangePassForm] = useState(false);
  const [newUserMsg, setNewUserMsg] = useState(null)
  const [changePassMsg, setChangePassMsg] = useState(null)

  const handleNewUser = (reason) => {
    if (reason === 'user created') {
    setNewUserMsg('User created successfully')
  } else if (reason === 'pressed cancel') {
    setNewUserMsg('User creation cancelled')
  }
    setTimeout(() => setNewUserMsg(null), 2000)
    setShowNewUserForm(false)
  }

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

      <button onClick={() => setShowNewUserForm(true)}>
        Create user
      </button>
      {showNewUserForm && (
        <SignUpPage
          onAnyBtnClick={handleNewUser}
        />
      )}
      {newUserMsg && <div>{newUserMsg}</div>}

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

export default connect(mapState)(HomeLead)
