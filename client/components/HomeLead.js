import React, { useState } from 'react'
import {connect} from 'react-redux'
import SignUpPage from './SignUpPage'

/**
 * COMPONENT
 */
export const HomeLead = props => {
  const {username} = props // приходит из mapstate
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [message, setMessage] = useState(null)

  const handleSuccess = (reason) => {
    if (reason === 'user created') {
    setMessage('User created successfully')
  } else if (reason === 'pressed cancel') {
    setMessage('User creation cancelled')
  }
    setTimeout(() => setMessage(null), 2000)
    setShowNewUserForm(false)
  }

  return (
    <div>
      <h3>Welcome, {username}</h3>

      <button onClick={() => setShowNewUserForm(true)}>
        Create user
      </button>
      {showNewUserForm && (
        <SignUpPage
          onAnyBtnClick={handleSuccess}
        />
      )}
      {message && <div>{message}</div>}
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
