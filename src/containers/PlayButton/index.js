import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import get from 'lodash/get'

import { playerControls } from 'helpers'

import ThemedPlayerButton from '../ThemedPlayerButton'

const { playControlAsync } = playerControls

class PlayButton extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      playbackStatus: { isPlaying, isTrackLoaded },
      playbackInfo: { id: trackId },
      track,
    } = this.props
    const {
      playbackStatus: { isPlayingNext, isTrackLoadedNext },
      playbackInfo: { id: trackIdNext },
      track: trackNext,
    } = nextProps

    return get(track, 'id') === trackId || get(track, 'id') === trackIdNext || !track
  }

  handleButtonClick = () => {
    const { track } = this.props
    return playControlAsync(track)
  }

  getIconName = () => {
    const {
      track,
      playbackStatus: { isPlaying, isTrackLoaded },
      playbackInfo: { id: trackId },
    } = this.props
    const id = get(track, 'id')
    if (!id) {
      if (isPlaying) return 'Pause'
      if (!isNil(isTrackLoaded) && !isTrackLoaded) return 'Spinner'
      return 'Play'
    }
    if (id === trackId) {
      if (isPlaying) return 'Pause'
      if (!isTrackLoaded) return 'Spinner'
    }
    return 'Play'
  }

  render() {
    const { track, className } = this.props
    console.log(`render PlayButton`, track)
    return (
      <ThemedPlayerButton
        className={className}
        onClick={this.handleButtonClick}
        iconName={this.getIconName()}
      />
    )
  }
}

PlayButton.propTypes = {
  className: PropTypes.string,
  track: PropTypes.object,
  playbackStatus: PropTypes.object.isRequired,
  playbackInfo: PropTypes.object.isRequired,
}
PlayButton.defaultProps = {
  className: '',
  track: null,
}

const mapStateToProps = ({ playbackStatus, playbackInfo }) => ({
  playbackStatus,
  playbackInfo,
})

export default connect(mapStateToProps)(PlayButton)
