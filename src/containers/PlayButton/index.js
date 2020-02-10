import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import isNil from 'lodash/isNil'
import get from 'lodash/get'

import { withPlayer } from 'hocs'

import ThemedPlayerButton from '../ThemedPlayerButton'

class PlayButton extends Component {
  handleButtonClick = () => {
    const { track, advPlayTrackAsync } = this.props
    return advPlayTrackAsync(track)
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
    const { className } = this.props
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
  advPlayTrackAsync: PropTypes.func.isRequired,
}
PlayButton.defaultProps = {
  className: '',
  track: null,
}

const mapStateToProps = ({ playbackStatus, playbackInfo }) => ({
  playbackStatus,
  playbackInfo,
})

export default compose(
  connect(mapStateToProps),
  withPlayer
)(PlayButton)
