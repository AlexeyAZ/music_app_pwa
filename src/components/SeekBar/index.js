import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import isNil from 'lodash/isNil'

import { Text } from '../Typography'

import styles from './styles.module.scss'

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
    const { value, duration, timeLeft } = this.props
    const isDurationExist = !isNil(duration)
    const isTimeLeftExist = !isNil(timeLeft)
    return (
      <div className={styles.wrap}>
        <div className={styles.track} style={{ width: `${(value * 100).toFixed(1)}%` }} />
        {isDurationExist && (
          <Text as="span" className={styles.duration}>
            {duration}
          </Text>
        )}
        {isTimeLeftExist && (
          <Text as="span" className={styles.timeLeft}>
            {timeLeft}
          </Text>
        )}
        <div className={styles.cover} onClick={this.handleBarClick} />
      </div>
    )
  }
}

SeekBar.propTypes = {
  value: PropTypes.number,
  duration: PropTypes.string,
  timeLeft: PropTypes.string,
  onClick: PropTypes.func,
}
SeekBar.defaultProps = {
  value: 0,
  duration: null,
  timeLeft: null,
  onClick: noop,
}

export default SeekBar
