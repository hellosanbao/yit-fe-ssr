import React from 'react'
import { hot } from 'react-hot-loader' //eslint-disable-line
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count1: 1,
      count2: 2,
    }
    this.addCount1 = this.addCount1.bind(this)
    this.addCount2 = this.addCount2.bind(this)
  }

  addCount1() {
    const { count1 } = this.state
    this.setState({
      count1: count1 + 1,
    })
  }

  addCount2() {
    const { count2 } = this.state
    this.setState({
      count2: count2 + 1,
    })
  }

  render() {
    const { count1, count2 } = this.state
    return (
      <div>
        <p>
          count1:
          {
            count1
          }
        </p>
        <p>
          count2:
          {
            count2
          }
        </p>
        <button type="button" onClick={this.addCount1}>count1+</button>
        <button type="button" onClick={this.addCount2}>count2+</button>
      </div>
    )
  }
}
// 使用react-hot-loader的api包裹app组件，实现热替换功能
export default hot(module)(App)
// export default App
