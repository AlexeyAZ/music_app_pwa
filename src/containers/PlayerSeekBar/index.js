import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import isNil from 'lodash/isNil'

import { SeekBar } from 'components'
import { withPlayer } from 'hocs'

import * as PlaybackPositionModule from 'modules/playbackPosition'

class PlayerSeekBar extends Component {
  getDurationAsPercent = () => {
    const {
      playbackPosition: { position },
      playbackStatus: { duration },
    } = this.props
    if (!isNil(duration) && !isNil(position)) {
      return position / duration
    }
    return 0
  }

  onBarClick = ({ position }) => {
    const {
      playbackStatus: { trackId, duration },
      seekTrack,
    } = this.props
    const newPosition = duration * position
    seekTrack(trackId, newPosition)
  }

  render() {
    return <SeekBar value={this.getDurationAsPercent()} onClick={this.onBarClick} />
  }
}

PlayerSeekBar.propTypes = {
  playbackStatus: PropTypes.object.isRequired,
  playbackPosition: PropTypes.object.isRequired,
  seekTrack: PropTypes.func.isRequired,
}

const mapStateToProps = ({ playbackPosition, playbackStatus }) => ({
  playbackPosition,
  playbackStatus,
})

const mapDispatchToProps = dispatch => ({
  // setPlayerInstance: bindActionCreators(PlayerModule.setPlayerInstance, dispatch),
  // updatePlaybackStatus: bindActionCreators(PlaybackStatusModule.updatePlaybackStatus, dispatch),
  updatePlaybackPosition: bindActionCreators(
    PlaybackPositionModule.updatePlaybackPosition,
    dispatch
  ),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withPlayer
)(PlayerSeekBar)
