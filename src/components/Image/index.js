import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import NapsterImage from '../NapsterImage'

import styles from './styles.module.scss'

const getImagePadding = ratio => {
  return { paddingBottom: `${100 * ratio}%` }
}

class Image extends Component {
  renderImage = () => {
    const { type, id, size, src, alt } = this.props
    if (type && id) {
      return <NapsterImage type={type} id={id} size={size} className={styles.image} />
    }
    if (src) {
      return <img src={src} alt={alt} className={styles.image} />
    }
    return <div className={styles.imageDummy} />
  }

  render() {
    const { className, imageRatio, borderRadius } = this.props
    const imageStyle = getImagePadding(imageRatio)
    return (
      <div
        className={cn(styles.wrap, styles[`borderRadius-${borderRadius}`], className)}
        style={imageStyle}
      >
        {this.renderImage()}
      </div>
    )
  }
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.string,
  imageRatio: PropTypes.number,
  borderRadius: PropTypes.oneOf(['default', 'xs', 's', 'm', 'l', 'round']),
}
Image.defaultProps = {
  className: '',
  src: null,
  alt: '',
  type: null,
  id: null,
  size: 's',
  imageRatio: 1,
  borderRadius: 'default',
}

export default Image
