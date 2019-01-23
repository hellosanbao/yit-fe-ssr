import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'
import AppStore from './store'

// 让mobx在服务端渲染时不会重复数据变化
useStaticRendering(true)

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)
const creatAppStore = function () {
  return { appState: new AppStore() }
}

export { creatAppStore }
