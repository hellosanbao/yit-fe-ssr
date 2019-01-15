import React, { Component } from 'react'
import {
  observer,
  inject,
} from 'mobx-react'

@inject('home')
@observer
class Home extends Component {
  componentDidMount() {
    const { home: { getDataSource } } = this.props
    setTimeout(() => {
      getDataSource(' kkkkkk')
    }, 1000)
    // do sth...
  }

  render() {
    const { home: { dataSource } } = this.props

    console.log(dataSource)
    return (
      <div>
        home page
        {
          dataSource
        }
      </div>
    )
  }
}

export default Home
