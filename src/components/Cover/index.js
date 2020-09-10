import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import { Row } from '../Grid'
import { Title, Text } from '../Typography'

const Cover = ({
  isImageFullScreen,
  napsterImageId,
  napsterImageType,
  napsterImageSize,
  imageRatio,
  title,
  subtitle,
}) => {
  const renderImage = useCallback(() => {
    return (
      <Image
        imageRatio={imageRatio}
        napsterImageId={napsterImageId}
        napsterImageSize={napsterImageSize}
        type={napsterImageType}
      />
    )
  }, [imageRatio, napsterImageId, napsterImageSize, napsterImageType])
  return (
    <div>
      {isImageFullScreen ? <Row>{renderImage()}</Row> : renderImage()}
      <Title>{title}</Title>
      <Text>{subtitle}</Text>
    </div>
  )
}

Cover.propTypes = {
  isImageFullScreen: PropTypes.bool,
  napsterImageId: PropTypes.string,
  napsterImageType: PropTypes.string,
  napsterImageSize: PropTypes.string,
  imageRatio: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
Cover.defaultProps = {
  isImageFullScreen: true,
  napsterImageId: null,
  napsterImageType: null,
  napsterImageSize: 'xs',
  imageRatio: 1,
  title: null,
  subtitle: null,
}

export default Cover
