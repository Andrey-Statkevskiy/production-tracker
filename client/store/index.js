// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { createLogger } from 'redux-logger'
// // import thunkMiddleware from 'redux-thunk'
// import { thunk } from 'redux-thunk'
// import { composeWithDevTools } from '@redux-devtools/extension'
// import auth from './auth'

// const reducer = combineReducers({ auth })

// const middleware = composeWithDevTools(
//   applyMiddleware(
//     thunk,
//     createLogger({ collapsed: true })
//   )
// )

// const store = createStore(reducer, middleware)

// export default store
// export * from './auth'

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