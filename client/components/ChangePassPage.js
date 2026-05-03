import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { changePass } from '../store';

export const ChangePassPage = ({ onAnyBtnClick }) => {
  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);
  const userId = useSelector(state => state.auth.id);

  const [changePassForm, setChangePassForm] = useState({
    currentPass: '',
    newPass: '',
    confirmNewPass: ''
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target

    setChangePassForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    dispatch(changePass(userId, changePassForm.currentPass, changePassForm.newPass, changePassForm.confirmNewPass, 'changePass'))
    onAnyBtnClick('pass changed'); //закроет форму у лидера в админке
  }

  return (
    <div className='signInContainer'>
      <h1 style={{ textAlign: 'center' }}>Change Password</h1>
      <form onSubmit={handleSubmit} name='change-pass'>
        <div>
          <label htmlFor="password">
            <small>Current Password</small>
          </label>
          <input name="currentPass" type="password" value={changePassForm.currentPass} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">
            <small>New Password</small>
          </label>
          <input name="newPass" type="password" value={changePassForm.newPass} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password">
            <small>Confirm New Password</small>
          </label>
          <input name="confirmNewPass" type="password" value={changePassForm.confirmNewPPass} onChange={handleChange}/>
        </div>
        <div>
          <button onClick={()=> onAnyBtnClick('pressed cancel')}>Cancel</button><br />
          <button type="submit">Change Password</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export default ChangePassPage;