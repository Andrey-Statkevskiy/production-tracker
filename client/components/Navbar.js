import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    <div className="navbar">
      <div className="item col1">
        <img src="/logo.png" style={{width: '75px' }} alt="PS Wave Relay Logo" />
      </div>

      <div className="item col2-top">Production Tracker</div>
      {/* <div className="item col2-bottom">User</div>

      <div className="item col3-top">Station</div>
      <div className="item col3-bottom">#-#</div>

      <div className="item col4-top">Level</div>
      <div className="item col4-bottom">#</div>

      <div className="item col5-top">Running</div>
      <div className="item col5-bottom">hh:mm:ss</div>

      <div className="item col6"># Assemblies Pending</div> */}
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>Logout</a> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          {/* <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link> */}
        </div>
      )}
      </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
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
