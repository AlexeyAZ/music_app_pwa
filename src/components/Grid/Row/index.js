import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './styles.module.scss'

const Row = ({ children, className }) => {
  return <div className={cn(className, styles.wrap)}>{children}</div>
}

Row.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}
Row.defaultProps = {
  children: null,
  className: '',
}

export default Row
