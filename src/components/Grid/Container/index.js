import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './styles.module.scss'

const Container = ({ children, className }) => {
  return <div className={cn(styles.wrap, className)}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}
Container.defaultProps = {
  children: null,
  className: '',
}

export default Container
