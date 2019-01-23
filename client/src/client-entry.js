import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import AppState from './store'

const initialState = window.__INITIAL_STATE__ || {} // eslint-disable-line
ReactDOM.hydrate(
  <Provider appState={new AppState(initialState.appState)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
)
