import axios from 'axios'

const TOKEN = 'token'

const SET_USERS = "SET_USERS"
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'

const initialState = {
  users: [],
  loading: false,
  error: null
}

const setUsers = users => ({type: SET_USERS, users})
const setLoading = () => ({type: SET_LOADING})
const setError = error => ({type: SET_ERROR, error})

export const fetchUsers = () => async dispatch => {
  const config = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
  }
  try {
    dispatch(setLoading())

    const { data } = await axios.get('/api/users', config)

    dispatch(setUsers(data))
  } catch (err) {
    dispatch(setError(err.response?.data || err.message))
  }
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }

    case SET_USERS:
      return { ...state, users: action.users, loading: false }

    case SET_ERROR:
      return { ...state, error: action.error, loading: false }

    default:
      return state
  }
}