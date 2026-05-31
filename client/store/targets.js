import axios from 'axios'

// ACTION TYPES
const SET_TARGETS = 'SET_TARGETS'
const SET_LOADING = 'SET_TARGETS_LOADING'
const SET_ERROR = 'SET_TARGETS_ERROR'

// INITIAL STATE
const initialState = {
  data: null,
  loading: false,
  error: null
}

// THUNKS

export const fetchTargets = () => async dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  }

  try {
    dispatch({ type: SET_LOADING })

    const { data } = await axios.get('/api/targets', config)

    dispatch({ type: SET_TARGETS, payload: data })
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      error: err.response?.data || err.message
    })
  }
}

export const saveTargets = (targets) => async dispatch => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  }

  try {
    dispatch({ type: SET_LOADING })

    const { data } = await axios.post('/api/targets', targets, config)

    dispatch({ type: SET_TARGETS, payload: data })

    return data // 👈 ВОТ ЭТО ОБЯЗАТЕЛЬНО
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      error: err.response?.data || err.message
    })

    throw err
  }
}

// REDUCER
export default function targetsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }

    case SET_TARGETS:
      return { ...state, data: action.payload, loading: false }

    case SET_ERROR:
      return { ...state, error: action.error, loading: false }

    default:
      return state
  }
}