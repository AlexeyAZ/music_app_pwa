import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withPlayer } from 'hocs'

import ThemedPlayerButton from '../ThemedPlayerButton'

class SkipNextButton extends Component {
  handleButtonClick = () => {
    const { nextTrackAsync } = this.props
    nextTrackAsync()
  }

  render() {
    return <ThemedPlayerButton onClick={this.handleButtonClick} iconName="SkipNext" />
  }
}

SkipNextButton.propTypes = {
  nextTrackAsync: PropTypes.func.isRequired,
}

export default withPlayer(SkipNextButton)
