import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import NapsterImage from '../NapsterImage'

import styles from './styles.module.scss'

const getImagePadding = ratio => {
  return { paddingBottom: `${100 * ratio}%` }
}

const Image = ({
  src,
  alt,
  className,
  type,
  napsterImageId,
  napsterImageSize,
  imageRatio,
  imageSize,
  borderRadius,
}) => {
  const renderImage = useCallback(() => {
    if (type && napsterImageId) {
      return (
        <NapsterImage
          type={type}
          id={napsterImageId}
          size={napsterImageSize}
          className={styles.image}
        />
      )
    }
    if (src) {
      return <img src={src} alt={alt} className={styles.image} />
    }
    return <div className={styles.imageDummy} />
  }, [type, napsterImageId, napsterImageSize, src, alt])

  const imageStyle = getImagePadding(imageRatio)

  return (
    <div className={styles[`imageSize-${imageSize}`]}>
      <div
        className={cn(styles.wrap, styles[`borderRadius-${borderRadius}`], className)}
        style={imageStyle}
      >
        {renderImage()}
      </div>
    </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  type: PropTypes.string,
  napsterImageId: PropTypes.string,
  napsterImageSize: PropTypes.string,
  imageRatio: PropTypes.number,
  imageSize: PropTypes.oneOf(['auto', 'xs', 's', 'm', 'l', 'fullscreen']),
  borderRadius: PropTypes.oneOf(['default', 'xs', 's', 'm', 'l', 'round']),
}
Image.defaultProps = {
  className: '',
  src: null,
  alt: '',
  type: null,
  napsterImageId: null,
  napsterImageSize: 's',
  imageRatio: 1,
  imageSize: 'auto',
  borderRadius: 'default',
}

export default Image
