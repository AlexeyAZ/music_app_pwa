import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './styles.module.scss'

const SimpleButton = ({ type, className, ...rest }) => {
  // eslint-disable-next-line react/button-has-type
  return <button type={type} className={cn(styles.button, className)} {...rest} />
}
SimpleButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
}
SimpleButton.defaultProps = {
  className: '',
  type: 'button',
}

export default SimpleButton
