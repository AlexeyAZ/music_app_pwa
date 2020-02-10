import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

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
    const { value } = this.props
    return (
      <div className={styles.wrap}>
        <div className={styles.track} style={{ width: `${(value * 100).toFixed(1)}%` }} />
        <div className={styles.cover} onClick={this.handleBarClick} />
      </div>
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
