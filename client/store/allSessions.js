import axios from 'axios'

// ACTION TYPES
const SET_SESSIONS = 'SET_SESSIONS'
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'

// INITIAL STATE
const initialState = {
  allSessions: [],
  loading: false,
  error: null
}

//THUNKS
export const fetchAllSessions = () => async dispatch => {
  const config = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
  }
  try {
    dispatch({ type: SET_LOADING })

    const { data } = await axios.get('/api/sessions/view-data', config)

    dispatch({ type: SET_SESSIONS, allSessions: data })
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.response?.data || err.message })
  }
}

// REDUCER
export default function allSessionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }

    case SET_SESSIONS:
      return { ...state, allSessions: action.allSessions, loading: false }

    case SET_ERROR:
      return { ...state, error: action.error, loading: false }

    default:
      return state
  }
}