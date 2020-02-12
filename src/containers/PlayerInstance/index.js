import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { initPlayer } from 'helpers'

class PlayerInstance extends Component {
  componentDidMount() {
    const { authOptions, player } = this.props
    if (authOptions.access_token && !player.instance) {
      initPlayer()
    }
  }

  render() {
    console.log('render PlayerInstance')
    return <video-js id="napster-streaming-player" playsinline style={{ display: 'none' }} />
  }
}

PlayerInstance.propTypes = {
  authOptions: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
}

const mapStateToProps = ({ authOptions, player }) => ({ authOptions, player })

export default connect(mapStateToProps)(PlayerInstance)
