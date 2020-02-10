import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlaybackStatusModule from 'modules/playbackStatus'

import ThemedPlayerButton from '../ThemedPlayerButton'

class RepeatButton extends Component {
  handleButtonClick = () => {
    const {
      playbackStatus: { isRepeat },
      updatePlaybackStatus,
    } = this.props
    updatePlaybackStatus({ isRepeat: !isRepeat })
  }

  render() {
    const {
      playbackStatus: { isRepeat },
    } = this.props
    return (
      <ThemedPlayerButton
        onClick={this.handleButtonClick}
        iconName="Repeat"
        iconColor={isRepeat ? 'black' : 'inactive'}
      />
    )
  }
}

RepeatButton.propTypes = {
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
)(RepeatButton)
