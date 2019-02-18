import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  observer,
  inject,
} from 'mobx-react'
import { Helmet } from 'react-helmet'

@inject('appState')
@observer
class Home extends Component {
  static propTypes = {
    appState: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.addCount = this.addCount.bind(this)
  }

  componentDidMount() {
    // do sth...
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 2000)
    })
  }

  addCount() {
    axios.get('/api/topics').then((res) => {
      console.log(res)
    })
    // this.props.appState.add()
  }

  render() {
    return (
      <div onClick={this.addCount}>
        <Helmet>
          <title>My Title1</title>
        </Helmet>
        <p>home page button</p>
        <p>total {this.props.appState.total}</p>
      </div>
    )
  }
}

export default Home
