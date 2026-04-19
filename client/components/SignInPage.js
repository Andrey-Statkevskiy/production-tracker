import {connect} from 'react-redux'
import {authenticate} from '../store'

export const SignInPage = (props) => {
  const {name, displayName, handleSubmit, error} = props;

  return (
    <div className='signInContainer'>
      <h1 style={{ margin: '50px 0 150px 0' }}>Sign-in as...</h1>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapStateToPropsLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapDispatchToPropsLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}
export default connect(mapStateToPropsLogin, mapDispatchToPropsLogin)(SignInPage);