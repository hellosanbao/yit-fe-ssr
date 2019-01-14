import React, { Component } from 'react'
import { hot } from 'react-hot-loader' //eslint-disable-line
import { Link } from 'react-router-dom'
import Routes from '../router'

class App extends Component {
  componentDidMount() {
    // do sth
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <br />
        <Link to="/ProductDetail">ProductDetail</Link>
        <Routes />
      </div>
    )
  }
}
// 使用react-hot-loader的api包裹app组件，实现热替换功能
export default hot(module)(App)
// export default App
