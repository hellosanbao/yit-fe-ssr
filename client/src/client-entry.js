import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import appState from './store'

ReactDOM.hydrate(
  <Provider>
    <BrowserRouter appState={appState}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
)
