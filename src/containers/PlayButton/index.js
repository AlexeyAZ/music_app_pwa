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
      playbackStatus: {
        track: { id: trackId },
      },
      track,
    } = this.props
    const {
      playbackStatus: {
        track: { id: trackIdNext },
      },
    } = nextProps

    return get(track, 'id') === trackId || get(track, 'id') === trackIdNext || !track
  }

  handleButtonClick = () => {
    const { track, playbackListId } = this.props
    return playControlAsync(track, playbackListId)
  }

  getIconName = () => {
    const {
      track,
      playbackStatus: {
        isPlaying,
        isTrackLoaded,
        track: { id: trackId },
      },
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
    const { disabled, className, iconSize } = this.props
    return (
      <ThemedPlayerButton
        disabled={disabled}
        className={className}
        iconSize={iconSize}
        onClick={this.handleButtonClick}
        iconName={this.getIconName()}
      />
    )
  }
}

PlayButton.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.string,
  track: PropTypes.object,
  playbackStatus: PropTypes.object.isRequired,
  playbackListId: PropTypes.string,
  disabled: PropTypes.bool,
}
PlayButton.defaultProps = {
  iconSize: 's',
  className: '',
  track: null,
  playbackListId: null,
  disabled: false,
}

const mapStateToProps = ({ playbackStatus }) => ({
  playbackStatus,
})

export default connect(mapStateToProps)(PlayButton)
