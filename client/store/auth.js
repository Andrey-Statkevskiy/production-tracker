import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
export const setAuthError = (error) => ({
  type: SET_AUTH_ERROR,
  error
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    dispatch(setAuthError(authError.response?.data || 'Login failed'))
    throw authError 
  }
}

export const register = (username, password, role, employeeId, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password, role, employeeId})
    dispatch(me())
  } catch (authError) {
    dispatch(setAuthError(authError.response?.data || 'User creation failed'))
    throw authError 
  }
}

export const changePass = (id, currentPass, newPass, confirmNewPass, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {id, currentPass, newPass, confirmNewPass})
    dispatch(me())
  } catch (authError) {
    throw authError
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...action.auth,
        error: null // 👈 очищаем ошибку при успехе
      }

    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.error // 👈 добавляем ошибку, НЕ затирая user
      }

    default:
      return state
  }
}
