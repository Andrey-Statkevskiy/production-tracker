// import { configureStore } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
// import auth from './auth'
// import sessionReducer from './sessions'
// import targetsReducer from './targets'

// const logger = createLogger({ collapsed: true })

// const store = configureStore({
//   reducer: {
//     auth,
//     session: sessionReducer,
//     targets: targetsReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(logger)
// })

// export default store
// export * from './auth'

// ^^^OLD STORE CONFIG IN CASE ACCESS TO DATA IS NEEDED^^^

// vvvNEW STORE CONFIG THAT PROTECTS DATA BTW ROLESvvv

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import auth from './auth'
import sessionReducer from './sessions'
import targetsReducer from './targets'

const logger = createLogger({ collapsed: true })

const appReducer = combineReducers({
  auth,
  session: sessionReducer,
  targets: targetsReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined // clearing store
  }

  return appReducer(state, action)
}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
})

export default store
export * from './auth'