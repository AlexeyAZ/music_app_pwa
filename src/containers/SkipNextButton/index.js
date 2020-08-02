import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import differenceBy from 'lodash/differenceBy'

import { REPEAT_BUTTON_STATUS_NONE } from 'constants'
import { playerControls } from 'helpers'

import ThemedPlayerButton from '../ThemedPlayerButton'

const { nextTrackAsync } = playerControls

class SkipNextButton extends Component {
  handleButtonClick = () => {
    nextTrackAsync()
  }

  isButtonDisabled = () => {
    const {
      playbackList: { playbackTracks, listened },
      playbackStatus: {
        isShuffle,
        repeat,
        track,
        track: { id: playbackId },
      },
    } = this.props

    if (repeat === REPEAT_BUTTON_STATUS_NONE) {
      if (isShuffle && differenceBy(playbackTracks, listened, [track], 'id').length === 0) {
        return true
      }
      const tracksCount = playbackTracks.length
      const currentTrackIndex = playbackTracks.findIndex(
        currentTrack => currentTrack.id === playbackId
      )
      const nextTrackIndex = currentTrackIndex + 1
      if (!isShuffle && tracksCount === nextTrackIndex) {
        return true
      }
    }
    return false
  }

  render() {
    return (
      <ThemedPlayerButton
        disabled={this.isButtonDisabled()}
        onClick={this.handleButtonClick}
        iconName="SkipNext"
      />
    )
  }
}

SkipNextButton.propTypes = {
  playbackList: PropTypes.object.isRequired,
  playbackStatus: PropTypes.object.isRequired,
}

const mapStateToProps = ({ playbackList, playbackStatus }) => ({
  playbackList,
  playbackStatus,
})

export default connect(mapStateToProps)(SkipNextButton)
