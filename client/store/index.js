import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import auth from './auth'
import sessionReducer from './sessions'
import targetsReducer from './targets'

const logger = createLogger({ collapsed: true })

const store = configureStore({
  reducer: {
    auth,
    session: sessionReducer,
    targets: targetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
})

export default store
export * from './auth'