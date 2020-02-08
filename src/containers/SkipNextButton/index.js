import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThemedPlayerButton from '../ThemedPlayerButton'

class SkipNextButton extends Component {
  render() {
    return <ThemedPlayerButton iconName="SkipNext" />
  }
}

SkipNextButton.propTypes = {}

export default SkipNextButton
