import React, { useState } from 'react'
import {connect} from 'react-redux'
import SignUpPage from './SignUpPage'

/**
 * COMPONENT
 */
export const HomeLead = props => {
  const {username} = props // приходит из mapstate
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  return (
    <div>
      <h3>Welcome, {username}</h3>

      <button onClick={() => setShowNewUserForm(true)}>
        Create user
      </button>
      {showNewUserForm && (
        <SignUpPage
          onAnyBtnClick={() => setShowNewUserForm(false)}
        />
      )}
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
