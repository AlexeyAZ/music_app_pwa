import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import cn from 'classnames'

import SimpleButton from '../../SimpleButton'
import Image from '../../Image'
import { Text } from '../../Typography'

import {
  CARD_TYPE_ARTIST,
  CARD_TYPE_ALBUM,
  CARD_TYPE_PLAYLIST,
  CARD_TYPE_GENRE,
  CARD_TYPE_STATION,
} from '../../../constants'

import styles from './styles.module.scss'

const cardConfig = {
  [CARD_TYPE_ARTIST]: {
    borderRadius: 'round',
    imageRatio: 1,
    imageType: CARD_TYPE_ARTIST,
    napsterImageSize: 's',
  },
  [CARD_TYPE_PLAYLIST]: {
    borderRadius: 's',
    imageRatio: 1,
    imageType: CARD_TYPE_PLAYLIST,
    napsterImageSize: 's',
  },
  [CARD_TYPE_GENRE]: {
    borderRadius: 'l',
    imageRatio: 1,
    imageType: CARD_TYPE_GENRE,
    napsterImageSize: 's',
  },
  [CARD_TYPE_STATION]: {
    borderRadius: 'default',
    imageRatio: 1,
    imageType: CARD_TYPE_STATION,
    napsterImageSize: 's',
  },
  [CARD_TYPE_ALBUM]: {
    borderRadius: 'default',
    imageRatio: 1,
    imageType: CARD_TYPE_ALBUM,
    napsterImageSize: 's',
  },
}

const CommonCard = ({
  format,
  type,
  id,
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
  const defaultImageType = get(cardConfig, `${type}.imageType`) || imageType
  const defaultNapsterImageSize = get(cardConfig, `${type}.napsterImageSize`) || napsterImageSize
  const defaultTitleSize = titleSize || (format === 'row' ? 's' : 'xs')
  const defaultSubtitleSize = subtitleSize || (format === 'row' ? 's' : 'xs')
  const defaultTextSize = textSize || (format === 'row' ? 's' : 'xs')
  const wrapClassName = cn(styles[`cardFormat-${format}`], className)
  const getTextOverflow = overflowType => {
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
      <div className={cn(styles[`imageSize-${imageSize}`], styles.imageWrap)}>
        <Image
          type={defaultImageType}
          napsterImageId={id}
          napsterImageSize={defaultNapsterImageSize}
          borderRadius={defaultBorderRadius}
          imageRatio={defaultImageRatio}
        />
      </div>
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

CommonCard.propTypes = {
  format: PropTypes.oneOf(['row', 'column', 'poster']),
  type: PropTypes.oneOf([
    CARD_TYPE_ARTIST,
    CARD_TYPE_ALBUM,
    CARD_TYPE_PLAYLIST,
    CARD_TYPE_GENRE,
    CARD_TYPE_STATION,
  ]),
  borderRadius: PropTypes.oneOf(['default', 'xs', 's', 'm', 'l', 'round']),
  id: PropTypes.string,
  imageSize: PropTypes.string,
  napsterImageSize: PropTypes.string,
  imageRatio: PropTypes.number,
  imageType: PropTypes.string,
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
  id: null,
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
