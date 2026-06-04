import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {register} from '../store'

export const SignUpPage = ({ onAnyBtnClick }) => {
  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: 'password',
    role: '',
    emplId: ''
  })

    const handleChange = (evt) => {
    const { name, value } = evt.target

    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const employeeId =
        registerForm.emplId === ''
          ? null
          : Number(registerForm.emplId)
      await dispatch(register(registerForm.username, registerForm.password, registerForm.role, employeeId, 'signup'))
      onAnyBtnClick('user created'); //will close the form in the control panel
    } catch (err) {}
  }

  return (
    <div className='signInContainer'>
      <h1 style={{ textAlign: 'center' }}>Create user</h1>
      <form onSubmit={handleSubmit} name='sign-in'>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" value={registerForm.username} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="role">
            <small>Role</small>
          </label>
          <input name="role" type="text" value={registerForm.role} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="emplId">
            <small>Employee Number</small>
          </label>
          <input name="emplId" type="number" value={registerForm.emplId} onChange={handleChange}/>
        </div>
        <div>
          <button onClick={()=> onAnyBtnClick('pressed cancel')}>Cancel</button><br />
          <button type="submit">Create New User</button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default SignUpPage;