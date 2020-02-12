import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { playerControls } from 'helpers'

import ThemedPlayerButton from '../ThemedPlayerButton'

const { previousTrackAsync } = playerControls

class SkipPreviousButton extends Component {
  handleButtonClick = () => {
    previousTrackAsync()
  }

  render() {
    return <ThemedPlayerButton onClick={this.handleButtonClick} iconName="SkipPrevious" />
  }
}

export default SkipPreviousButton
