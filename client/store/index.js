import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import auth from './auth'

const logger = createLogger({ collapsed: true })

const store = configureStore({
  reducer: {
    auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
})

export default store
export * from './auth'