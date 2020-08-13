import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import cn from 'classnames'

import SimpleButton from '../../SimpleButton'
import Image from '../../Image'
import { Text } from '../../Typography'

import { NAPSTER_IMAGE_SIZES, CARD_TYPES } from '../../../constants'

import styles from './styles.module.scss'

const cardConfig = {
  [CARD_TYPES.ARTIST]: {
    borderRadius: 'round',
    imageRatio: 1,
    imageType: CARD_TYPES.ARTIST,
    napsterImageSize: 's',
  },
  [CARD_TYPES.PLAYLIST]: {
    borderRadius: 's',
    imageRatio: 1,
    imageType: CARD_TYPES.PLAYLIST,
    napsterImageSize: 's',
  },
  [CARD_TYPES.GENRE]: {
    borderRadius: 'l',
    imageRatio: 1,
    imageType: CARD_TYPES.GENRE,
    napsterImageSize: 's',
  },
  [CARD_TYPES.STATION]: {
    borderRadius: 'default',
    imageRatio: 1,
    imageType: CARD_TYPES.STATION,
    napsterImageSize: 's',
  },
  [CARD_TYPES.ALBUM]: {
    borderRadius: 'default',
    imageRatio: 1,
    imageType: CARD_TYPES.ALBUM,
    napsterImageSize: 's',
  },
}

const CommonCard = ({
  format,
  type,
  napsterImageId,
  imageSize,
  napsterImageSize,
  imageRatio,
  imageType,
  borderRadius,
  title,
  titleSize,
  titleOverflow,
  subtitle,
  subtitleSize,
  subtitleOverflow,
  text,
  textSize,
  textOverflow,
  onClick,
  className,
}) => {
  const defaultBorderRadius = get(cardConfig, `${type}.borderRadius`) || borderRadius
  const defaultImageRatio = get(cardConfig, `${type}.imageRatio`) || imageRatio
  console.log(defaultImageRatio)
  const defaultImageType = get(cardConfig, `${type}.imageType`) || imageType
  const defaultNapsterImageSize = get(cardConfig, `${type}.napsterImageSize`) || napsterImageSize
  const defaultTitleSize = titleSize || (format === 'row' ? 's' : 'xs')
  const defaultSubtitleSize = subtitleSize || (format === 'row' ? 's' : 'xs')
  const defaultTextSize = textSize || (format === 'row' ? 's' : 'xs')
  const wrapClassName = cn(styles[`cardFormat-${format}`], className)
  const getTextOverflow = (overflowType) => {
    if (overflowType) {
      return overflowType
    }
    if (format === 'row') {
      return false
    }
    return true
  }
  const defaultTitleOverflow = getTextOverflow(titleOverflow)
  const defaultSubtitleOverflow = getTextOverflow(subtitleOverflow)
  const defaultTextOverflow = getTextOverflow(textOverflow)
  const renderContent = () => (
    <>
      <Image
        type={defaultImageType}
        napsterImageId={napsterImageId}
        napsterImageSize={defaultNapsterImageSize}
        borderRadius={defaultBorderRadius}
        imageRatio={defaultImageRatio}
        imageSize={imageSize}
        className={styles.imageWrap}
      />
      <div className={styles.info}>
        <Text size={defaultTitleSize} overflow={defaultTitleOverflow}>
          {title}
        </Text>
        <Text size={defaultSubtitleSize} color="gray" overflow={defaultSubtitleOverflow}>
          {subtitle}
        </Text>
        <Text size={defaultTextSize} color="gray" overflow={defaultTextOverflow}>
          {text}
        </Text>
      </div>
    </>
  )
  if (onClick) {
    return (
      <SimpleButton className={wrapClassName} onClick={onClick}>
        {renderContent()}
      </SimpleButton>
    )
  }
  return <div className={wrapClassName}>{renderContent()}</div>
}

const sizes = JSON.parse(JSON.stringify(Object.values(NAPSTER_IMAGE_SIZES)))
console.log(sizes)
CommonCard.propTypes = {
  format: PropTypes.oneOf(['row', 'column', 'poster']),
  type: PropTypes.oneOf(Object.values(CARD_TYPES)),
  borderRadius: PropTypes.oneOf(['default', 'xs', 's', 'm', 'l', 'round']),
  napsterImageId: PropTypes.string,
  imageSize: PropTypes.oneOf(['auto', 'xs', 's', 'm', 'l', 'fullscreen']),
  napsterImageSize: PropTypes.oneOf(Object.values(NAPSTER_IMAGE_SIZES)),
  imageRatio: PropTypes.number,
  imageType: PropTypes.oneOf(Object.values(CARD_TYPES)),
  title: PropTypes.string,
  titleSize: PropTypes.string,
  titleOverflow: PropTypes.bool,
  subtitle: PropTypes.string,
  subtitleSize: PropTypes.string,
  subtitleOverflow: PropTypes.bool,
  text: PropTypes.string,
  textSize: PropTypes.string,
  textOverflow: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
}
CommonCard.defaultProps = {
  format: 'column',
  type: null,
  borderRadius: 'default',
  napsterImageId: null,
  imageSize: 'auto',
  napsterImageSize: 's',
  imageRatio: 1,
  imageType: null,
  title: null,
  titleSize: 'xs',
  titleOverflow: true,
  subtitle: null,
  subtitleSize: 'xs',
  subtitleOverflow: true,
  text: null,
  textSize: 'xs',
  textOverflow: true,
  className: '',
  onClick: null,
}

export default CommonCard
