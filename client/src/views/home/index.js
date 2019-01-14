import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'

@inject('appState')
@observer
class Home extends Component {
  static propTypes = {
    appState: PropTypes.object,
  };
  componentDidMount() {
    // do sth...
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        home page
        {
          appState.count
        }
      </div>
    )
  }
}

export default Home
