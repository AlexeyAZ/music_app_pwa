import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import isNil from 'lodash/isNil'

import { SeekBar } from 'components'
import { withPlayer } from 'hocs'

class PlayerSeekBar extends Component {
  getDurationAsPercent = () => {
    const {
      playbackPosition: { position },
      playbackInfo: { playbackSeconds: duration },
    } = this.props
    if (!isNil(duration) && !isNil(position)) {
      return position / duration
    }
    return 0
  }

  onBarClick = ({ position }) => {
    const {
      playbackInfo: { id: trackId, playbackSeconds: duration },
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
  playbackInfo: PropTypes.object.isRequired,
  playbackPosition: PropTypes.object.isRequired,
  seekTrack: PropTypes.func.isRequired,
}

const mapStateToProps = ({ playbackPosition, playbackInfo }) => ({
  playbackPosition,
  playbackInfo,
})

export default compose(
  connect(mapStateToProps),
  withPlayer
)(PlayerSeekBar)
