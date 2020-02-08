import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThemedPlayerButton from '../ThemedPlayerButton'

class SkipPreviousButton extends Component {
  render() {
    return <ThemedPlayerButton iconName="SkipPrevious" />
  }
}

SkipPreviousButton.propTypes = {}

export default SkipPreviousButton
