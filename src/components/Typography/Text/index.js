import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './styles.module.scss'

const Text = ({ as: Tag, size, children, className }) => {
  return <Tag className={cn(styles[`text-${size}`], styles.text, className)}>{children}</Tag>
}

Text.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  as: PropTypes.any,
  size: PropTypes.string,
}
Text.defaultProps = {
  children: null,
  className: '',
  as: 'p',
  size: 's',
}

export default Text
