import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlaybackStatusModule from 'modules/playbackStatus'

import ThemedPlayerButton from '../ThemedPlayerButton'

class ShuffleButton extends Component {
  handleButtonClick = () => {
    const {
      playbackStatus: { isShuffle },
      updatePlaybackStatus,
    } = this.props
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
}

const mapStateToProps = ({ playbackStatus }) => ({
  playbackStatus,
})

const mapDispatchToProps = dispatch => ({
  updatePlaybackStatus: bindActionCreators(PlaybackStatusModule.updatePlaybackStatus, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShuffleButton)
