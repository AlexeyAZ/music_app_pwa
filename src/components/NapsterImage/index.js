import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { getNapsterImage } from '../../helpers'

import ImageLazy from '../ImageLazy'

import styles from './styles.module.scss'

const NapsterImage = ({ type, id, size, className }) => {
  const [isTransparent, setTransparent] = useState(false)
  const handleImageLoadError = useCallback(() => {
    setTransparent(true)
  }, [])
  return (
    <img
      className={cn({ [styles.transparent]: isTransparent }, className)}
      src={getNapsterImage({ type, id, size })}
      alt=""
      onError={handleImageLoadError}
    />
  )
}

NapsterImage.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.string,
}
NapsterImage.defaultProps = {
  className: '',
  size: 'xs',
}

export default NapsterImage
