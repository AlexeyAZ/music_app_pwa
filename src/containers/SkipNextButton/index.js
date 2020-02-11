import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import differenceBy from 'lodash/differenceBy'

import { withPlayer } from 'hocs'

import { REPEAT_BUTTON_STATUS_NONE } from 'constants'

import ThemedPlayerButton from '../ThemedPlayerButton'

class SkipNextButton extends Component {
  handleButtonClick = () => {
    const { nextTrackAsync } = this.props
    nextTrackAsync()
  }

  isButtonDisabled = () => {
    const {
      playbackList: { tracks, listened },
      playbackStatus: { isShuffle, repeat },
      playbackInfo: { id: playbackId },
    } = this.props

    if (repeat === REPEAT_BUTTON_STATUS_NONE) {
      if (isShuffle && differenceBy(tracks, listened, 'id').length === 0) {
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
  nextTrackAsync: PropTypes.func.isRequired,
}

const mapStateToProps = ({ playbackList, playbackStatus, playbackInfo }) => ({
  playbackList,
  playbackStatus,
  playbackInfo,
})

export default compose(
  connect(mapStateToProps),
  withPlayer
)(SkipNextButton)
