import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './styles.module.scss'

const ScrollContainer = ({ children, className }) => {
  return (
    <div className={cn(styles.wrap, className)}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

ScrollContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}
ScrollContainer.defaultProps = {
  className: '',
  children: null,
}

export default ScrollContainer
