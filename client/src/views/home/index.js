import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'
import AppState from '../../store'

@inject('appState')
@observer
class Home extends Component {
  componentDidMount() {
    // do sth...
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        home page
        {
          appState
        }
      </div>
    )
  }
}

Home.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}

export default Home
