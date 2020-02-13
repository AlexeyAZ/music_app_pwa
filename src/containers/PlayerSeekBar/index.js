import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'

import { SeekBar } from 'components'
import { playerControls } from 'helpers'

import * as PlaybackStatusModule from 'modules/playbackStatus'

const { trackIdSelector, durationSelector } = PlaybackStatusModule
const { seekTrack } = playerControls

class PlayerSeekBar extends Component {
  getDurationAsPercent = () => {
    const { playbackPosition, playbackDuration } = this.props
    if (!isNil(playbackDuration) && !isNil(playbackPosition)) {
      return playbackPosition / playbackDuration
    }
    return 0
  }

  onBarClick = ({ position }) => {
    const { trackId, playbackDuration } = this.props
    const newPosition = playbackDuration * position
    seekTrack(trackId, newPosition)
  }

  render() {
    return <SeekBar value={this.getDurationAsPercent()} onClick={this.onBarClick} />
  }
}

PlayerSeekBar.propTypes = {
  trackId: PropTypes.string,
  playbackDuration: PropTypes.number,
  playbackPosition: PropTypes.number.isRequired,
}
PlayerSeekBar.defaultProps = {
  trackId: null,
  playbackDuration: null,
}

const mapStateToProps = state => ({
  playbackPosition: state.playbackPosition.position,
  trackId: trackIdSelector(state),
  playbackDuration: durationSelector(state),
})

export default connect(mapStateToProps)(PlayerSeekBar)
