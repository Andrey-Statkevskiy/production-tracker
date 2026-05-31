import './LeaderHelpers/HomeLead.css'
import React, { useState } from 'react'
import {connect} from 'react-redux'
import SignUpPage from './SignUpPage'
import ChangePassPage from './ChangePassPage'

/**
 * COMPONENT
 */
export const HomeLead = props => {
  const {username} = props // comes from mapstate
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
    <div className='homeLeadContainer'>
      <div className='controlsContainer'>
        <p className='columnTitle'>Controls</p>
        <button className='btn btn-blue' onClick={() => console.log("Set Target Btn clicked")}>
          Set Targets
        </button>
        <button className='btn btn-blue' onClick={() => console.log("Reset Progress Btn clicked")}>
          Reset Progress
        </button>
        <button className='btn btn-blue' onClick={() => console.log("View All Users Btn clicked")}>
          View All Users
        </button>
        <button className='btn btn-blue' onClick={() => console.log("View/Export Data Btn clicked")}>
          View/Export Data
        </button>
        <button className='btn btn-blue' onClick={() => setShowNewUserForm(true)}>
          Create user
        </button>
        {showNewUserForm && (
          <SignUpPage
            onAnyBtnClick={handleNewUser}
          />
        )}
        {newUserMsg && <div>{newUserMsg}</div>}

        <button className='btn btn-blue' onClick={() => setShowChangePassForm(true)}>
          Change Password
        </button>
        {showChangePassForm && (
          <ChangePassPage
            onAnyBtnClick={handleChangePass}
          />
        )}
        {changePassMsg && <div>{changePassMsg}</div>}
      </div>
      <div className='progressContainer'>
        <p className='columnTitle'>Progress</p>
      </div>
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
