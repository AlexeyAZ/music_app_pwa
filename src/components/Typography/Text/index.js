import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './styles.module.scss'

const Text = ({ as: Tag, overflow, size, mb, color, weight, children, className }) => {
  return (
    <Tag
      className={cn(
        {
          [styles.overflow]: overflow,
        },
        styles[`text-${size}`],
        styles[`color-${color}`],
        styles[`text-${weight}`],
        styles[`mb-${mb}`],
        className
      )}
    >
      {children}
    </Tag>
  )
}

Text.propTypes = {
  overflow: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  as: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
Text.defaultProps = {
  overflow: false,
  children: null,
  className: '',
  as: 'p',
  size: 's',
  color: 'black',
  weight: 'normal',
  mb: 0,
}

export default Text
