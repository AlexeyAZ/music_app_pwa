import React from 'react'
import PropTypes from 'prop-types'

import { LazyImage } from 'react-lazy-images'

const ImageLazy = ({ placeholder, src, alt, className }) => {
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      placeholder={({ imageProps, ref }) => (
        <div ref={ref} className={className}>
          1
        </div>
      )}
      loading={() => <div className={className}>1</div>}
      actual={({ imageProps }) => <img className={className} {...imageProps} />}
    />
  )
}

ImageLazy.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  className: PropTypes.string,
}
ImageLazy.defaultProps = {
  alt: '',
  placeholder: null,
  className: '',
}

export default ImageLazy
