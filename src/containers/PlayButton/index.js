import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import isNil from 'lodash/isNil'

import { withPlayer } from 'hocs'

import ThemedPlayerButton from '../ThemedPlayerButton'

class PlayButton extends Component {
  handleButtonClick = () => {
    const { id, advPlayTrack } = this.props
    return advPlayTrack(id)
  }

  getIconName = () => {
    const {
      id,
      playbackStatus: { isPlaying, isTrackLoaded, trackId },
    } = this.props
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
    return <ThemedPlayerButton onClick={this.handleButtonClick} iconName={this.getIconName()} />
  }
}

PlayButton.propTypes = {
  playbackStatus: PropTypes.object.isRequired,
  id: PropTypes.string,
  advPlayTrack: PropTypes.func.isRequired,
}
PlayButton.defaultProps = {
  id: null,
}

const mapStateToProps = ({ playbackStatus }) => ({
  playbackStatus,
})

export default compose(
  connect(mapStateToProps),
  withPlayer
)(PlayButton)
