import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlaybackStatusModule from 'modules/playbackStatus'
import * as PlaybackListModule from 'modules/playbackList'

import ThemedPlayerButton from '../ThemedPlayerButton'

class ShuffleButton extends Component {
  handleButtonClick = async () => {
    const {
      playbackStatus: { isShuffle },
      updatePlaybackStatus,
      clearListened,
    } = this.props
    await clearListened()
    updatePlaybackStatus({ isShuffle: !isShuffle })
  }

  render() {
    const {
      playbackStatus: { isShuffle },
    } = this.props
    return (
      <ThemedPlayerButton
        onClick={this.handleButtonClick}
        iconName="Shuffle"
        iconColor={isShuffle ? 'black' : 'inactive'}
      />
    )
  }
}

ShuffleButton.propTypes = {
  playbackStatus: PropTypes.object.isRequired,
  updatePlaybackStatus: PropTypes.func.isRequired,
  clearListened: PropTypes.func.isRequired,
}

const mapStateToProps = ({ playbackStatus }) => ({
  playbackStatus,
})

const mapDispatchToProps = dispatch => ({
  updatePlaybackStatus: bindActionCreators(PlaybackStatusModule.updatePlaybackStatus, dispatch),
  clearListened: bindActionCreators(PlaybackListModule.clearListened, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShuffleButton)
