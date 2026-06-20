import axios from "axios";

// ACTION TYPES
const SET_TARGETS = "SET_TARGETS";
const SET_SUMMARY = "SET_SUMMARY";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

// INITIAL STATE
const initialState = {
  targets: [],
  loading: false,
  error: null,
};

const normalizeTargets = (payload) => {
  if (!payload) return [];

  // single object from PATCH → wrap it
  if (!Array.isArray(payload)) {
    return [payload];
  }

  return payload;
};

// THUNKS
export const fetchTargets = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  try {
    dispatch({ type: SET_LOADING });

    const { data } = await axios.get("/api/targets", config);
    dispatch({ type: SET_TARGETS, payload: data });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      error: err.response?.data || err.message,
    });
  }
};

export const fetchSummary = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  try {
    dispatch({ type: SET_LOADING });

    const { data } = await axios.get("/api/targets/summary", config);

    dispatch({ type: SET_SUMMARY, payload: data });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      error: err.response?.data || err.message,
    });

    throw err;
  }
};

export const updateSingleTarget = (level, payload) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  try {
    dispatch({ type: SET_LOADING });

    const { data } = await axios.patch(
      "/api/targets",
      {
        level,
        ...payload,
      },
      config,
    );

    dispatch({ type: SET_TARGETS, payload: data });

    return data;
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      error: err.response?.data || err.message,
    });

    throw err;
  }
};

// REDUCER
export default function targetsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case SET_TARGETS:
      return {
        ...state,
        targets: normalizeTargets(action.payload),
        loading: false,
      };

    case SET_SUMMARY:
      return { ...state, summary: action.payload, loading: false };

    case SET_ERROR:
      return { ...state, error: action.error, loading: false };

    default:
      return state;
  }
}
