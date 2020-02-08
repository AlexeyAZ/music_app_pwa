import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Box from '../Box'

class SeekBar extends Component {
  handleBarClick = e => {
    const { onClick } = this.props
    const elementWidth = e.target.offsetWidth
    const bounds = e.target.getBoundingClientRect()
    const { left } = bounds
    const clickPositionX = e.clientX - left
    if (clickPositionX > 0) {
      return onClick({ position: clickPositionX / elementWidth })
    }
  }

  render() {
    const { value } = this.props
    return (
      <Box position="relative" bg="gray" height={50}>
        <Box bg="red" height="100%" style={{ width: `${(value * 100).toFixed(1)}%` }} />
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          onClick={this.handleBarClick}
        />
      </Box>
    )
  }
}

SeekBar.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func,
}
SeekBar.defaultProps = {
  value: 0,
  onClick: noop,
}

export default SeekBar
