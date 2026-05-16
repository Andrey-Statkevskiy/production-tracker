import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, role, station, level}) => (
  <nav>
    <div className="navbar">
      <div className="item col1">
        <img src="/logo.png" style={{width: '75px' }} alt="PS Wave Relay Logo" />
      </div>

      <div className="item col2-top">Production Tracker</div>
      {isLoggedIn && (
        <>
          <div className="item col2-bottom">{role && (role[0].toUpperCase() + role.slice(1))}</div>

          <div className={`item col3-top ${!station ? 'hidden' : ''}`}>Station</div>
          <div className={`item col3-bottom ${!station ? 'hidden' : ''}`}>{station}</div>

          <div className={`item col4-top ${!level ? 'hidden' : ''}`}>Level</div>
          <div className={`item col4-bottom ${!level ? 'hidden' : ''}`}>{level}</div>

          {/*<div className="item col5-top">Running</div>
          <div className="item col5-bottom">hh:mm:ss</div>

          <div className="item col6"># Assemblies Pending</div> */}
        </>
      )}
      {isLoggedIn &&
        <div>
          <a href="#" onClick={handleClick}>Logout</a>
        </div>
      }
      </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    role: state.auth.role,
    station: state.session.activeSession?.station,
    level: state.session.activeSession?.level,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
