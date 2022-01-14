import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
// import configureStore from './training/store/configureStore'
import AsyncApp from './training/containers/AsyncApp'
import rootReducer from './training/reducers/reducers'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

// import { applyMiddleware, compose, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'

// import rootReducer from './training/application/reducers'

// const middlewares = [ thunkMiddleware ]
// const store = createStore(rootReducer)
// const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer)

const loggerMiddleware = createLogger()

const configureStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

const store = configureStore

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AsyncApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

