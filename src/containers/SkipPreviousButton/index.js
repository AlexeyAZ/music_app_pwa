import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withPlayer } from 'hocs'

import ThemedPlayerButton from '../ThemedPlayerButton'

class SkipPreviousButton extends Component {
  handleButtonClick = () => {
    const { previousTrack } = this.props
    previousTrack()
  }

  render() {
    return <ThemedPlayerButton onClick={this.handleButtonClick} iconName="SkipPrevious" />
  }
}

SkipPreviousButton.propTypes = {
  previousTrack: PropTypes.func.isRequired,
}

export default withPlayer(SkipPreviousButton)
