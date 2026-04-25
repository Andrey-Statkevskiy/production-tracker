import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom'
import SignInPage from './components/SignInPage'
import HomeAssyTech from './components/HomeAssyTech'
import HomeLead from './components/HomeLead'
import HomeTv from './components/HomeTv'
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, role } = this.props // приходит из mapstate

    return (
      <RouterRoutes>
        {isLoggedIn ? (
          <>
            <Route path="/home" element={(role === 'technician') ? <HomeAssyTech /> : (role === 'leader') ? <HomeLead /> : <HomeTv />} />
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
const mapState = state => { // приходит из того, что было вызвано диспатчами в mapdispatch
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    role: state.auth.role // state это то что в конце, в reducer в store/auth.js, auth - это объект auth из reducer/setter action наверное
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
