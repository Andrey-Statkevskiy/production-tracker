import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
const LOGOUT = 'LOGOUT'
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
    type: LOGOUT
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
        error: null // clear error upon success
      }

    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.error // keeping the user, add error
      }
    
    case LOGOUT:
      return {} // clearing auth state

    default:
      return state
  }
}
