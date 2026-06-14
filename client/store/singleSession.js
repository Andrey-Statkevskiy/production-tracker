import axios from 'axios'

// ACTION TYPES
const SET_SESSION = 'SET_SESSION'
const CLEAR_SESSION = 'CLEAR_SESSION'
const SET_LOADING = 'SET_LOADING'
const SET_ERROR = 'SET_ERROR'

// INITIAL STATE
const initialState = {
  activeSession: null,
  loading: false,
  error: null
}

//THUNKS
export const fetchActiveSession = () => async dispatch => {
  const config = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
  }
  try {
    dispatch({ type: SET_LOADING })

    const { data } = await axios.get('/api/sessions/active', config)

    dispatch({ type: SET_SESSION, session: data })
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.response?.data || err.message })
  }
}

export const startSession = (station, level) => async dispatch => {
  const config = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
  }
  try {
    dispatch({ type: SET_LOADING })

    const { data } = await axios.post('/api/sessions/start', {
      station,
      level
    }, config)

    dispatch({ type: SET_SESSION, session: data })
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.response?.data || err.message })
  }
}

export const completeSession = (sessionId, scans, unitsCount) => async dispatch => {
  const config = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
  }
  try {
    dispatch({ type: SET_LOADING })

    await axios.post(`/api/sessions/${sessionId}/complete`, {
     scans, unitsCount
    }, config)

    dispatch({ type: CLEAR_SESSION })
  } catch (err) {
    dispatch({ type: SET_ERROR, error: err.response?.data || err.message })
  }
}

// REDUCER
export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }

    case SET_SESSION:
      return { ...state, activeSession: action.session, loading: false }

    case CLEAR_SESSION:
      return { ...state, activeSession: null, loading: false }

    case SET_ERROR:
      return { ...state, error: action.error, loading: false }

    default:
      return state
  }
}