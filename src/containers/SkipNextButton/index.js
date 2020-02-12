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
      playbackList: { tracks, listened },
      playbackStatus: { isShuffle, repeat },
      playbackInfo,
      playbackInfo: { id: playbackId },
    } = this.props

    if (repeat === REPEAT_BUTTON_STATUS_NONE) {
      if (isShuffle && differenceBy(tracks, listened, [playbackInfo], 'id').length === 0) {
        return true
      }
      const tracksCount = tracks.length
      const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
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
  playbackInfo: PropTypes.object.isRequired,
}

const mapStateToProps = ({ playbackList, playbackStatus, playbackInfo }) => ({
  playbackList,
  playbackStatus,
  playbackInfo,
})

export default connect(mapStateToProps)(SkipNextButton)
