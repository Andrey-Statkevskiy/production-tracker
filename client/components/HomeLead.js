import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const HomeLead = props => {
  const {username} = props // приходит из mapstate

  return (
    <div>
      <h3>Welcome, {username}</h3>
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
