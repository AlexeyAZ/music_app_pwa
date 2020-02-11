import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  REPEAT_BUTTON_STATUS_ONE,
  REPEAT_BUTTON_STATUS_ALL,
  REPEAT_BUTTON_STATUS_NONE,
} from 'constants'

import * as PlaybackStatusModule from 'modules/playbackStatus'

import ThemedPlayerButton from '../ThemedPlayerButton'

class RepeatButton extends Component {
  handleButtonClick = () => {
    const {
      playbackStatus: { repeat },
      updatePlaybackStatus,
    } = this.props
    if (repeat === REPEAT_BUTTON_STATUS_ALL) {
      updatePlaybackStatus({ repeat: REPEAT_BUTTON_STATUS_ONE })
    }
    if (repeat === REPEAT_BUTTON_STATUS_ONE) {
      updatePlaybackStatus({ repeat: REPEAT_BUTTON_STATUS_NONE })
    }
    if (repeat === REPEAT_BUTTON_STATUS_NONE) {
      updatePlaybackStatus({ repeat: REPEAT_BUTTON_STATUS_ALL })
    }
  }

  getButtonIcon = () => {
    const {
      playbackStatus: { repeat },
    } = this.props
    if (repeat === REPEAT_BUTTON_STATUS_ONE) {
      return 'RepeatOne'
    }
    return 'Repeat'
  }

  getButtonColor = () => {
    const {
      playbackStatus: { repeat },
    } = this.props
    if (repeat === REPEAT_BUTTON_STATUS_NONE) {
      return 'inactive'
    }
    return 'black'
  }

  render() {
    return (
      <ThemedPlayerButton
        onClick={this.handleButtonClick}
        iconName={this.getButtonIcon()}
        iconColor={this.getButtonColor()}
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
