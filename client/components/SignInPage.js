import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import {authenticate} from '../store'

export const SignInPage = (props) => {
  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

    const handleChange = (evt) => {
    const { name, value } = evt.target

    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()
    try {
      await dispatch(authenticate(loginForm.username, loginForm.password, 'login'))
    } catch (err) {
      
    }
  }

  return (
    <div className='signInContainer'>
      <h1 style={{ margin: '50px 0 75px 0', textAlign: 'center' }}>Welcome!<br />Please sign-in.</h1>
      <form  className='signInForm' onSubmit={handleSubmit} name='sign-in'>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" value={loginForm.username} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" value={loginForm.password} onChange={handleChange}/>
        </div>
        <div className='button-group'>
          <button className='btn btn-blue' type="submit">Sign-in</button>
        </div>
        {error && <div className='errorTxt'> {error} </div>}
      </form>
    </div>
  )
}

export default SignInPage;