import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom'
import SignInPage from './components/SignInPage'
import HomeAssyTech from './components/HomeAssyTech'
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <RouterRoutes>
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<HomeAssyTech />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </RouterRoutes>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Routes);
