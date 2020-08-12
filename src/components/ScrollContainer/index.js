import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import noop from 'lodash/noop'

import styles from './styles.module.scss'

const ScrollContainer = ({ containerRef, children, className, containerClassName }) => {
  return (
    <div className={cn(styles.wrap, className)}>
      <div ref={containerRef} className={cn(styles.container, containerClassName)}>
        {children}
      </div>
    </div>
  )
}

ScrollContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  containerClassName: PropTypes.string,
  containerRef: PropTypes.func,
}
ScrollContainer.defaultProps = {
  className: '',
  children: null,
  containerClassName: '',
  containerRef: noop,
}

export default ScrollContainer
