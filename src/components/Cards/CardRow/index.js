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

const CardRow = ({
  format,
  type,
  id,
  cardSize,
  imageSize,
  napsterImageSize,
  imageRatio,
  imageType,
  borderRadius,
  title,
  titleOverflow,
  subtitle,
  subtitleOverflow,
  onClick,
  className,
}) => {
  const defaultBorderRadius = get(cardConfig, `${type}.borderRadius`) || borderRadius
  const defaultImageRatio = get(cardConfig, `${type}.imageRatio`) || imageRatio
  const defaultImageType = get(cardConfig, `${type}.imageType`) || imageType
  const defaultNapsterImageSize = get(cardConfig, `${type}.napsterImageSize`) || napsterImageSize
  const wrapClassName = cn(styles[`cardFormat-${format}`], className)

  return <CommonCard />
}

CardRow.propTypes = {
  format: PropTypes.oneOf(['row', 'column']),
  type: PropTypes.oneOf([
    CARD_TYPE_ARTIST,
    CARD_TYPE_ALBUM,
    CARD_TYPE_PLAYLIST,
    CARD_TYPE_GENRE,
    CARD_TYPE_STATION,
  ]),
  cardSize: PropTypes.oneOf(['auto', 'xs', 's', 'm', 'l', 'fullscreen']),
  borderRadius: PropTypes.oneOf(['default', 'xs', 's', 'm', 'l', 'round']),
  id: PropTypes.string,
  imageSize: PropTypes.string,
  napsterImageSize: PropTypes.string,
  imageRatio: PropTypes.number,
  imageType: PropTypes.string,
  title: PropTypes.string,
  titleOverflow: PropTypes.bool,
  subtitle: PropTypes.string,
  subtitleOverflow: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
}
CardRow.defaultProps = {
  format: 'column',
  type: null,
  cardSize: 'auto',
  borderRadius: 'default',
  id: null,
  imageSize: 'auto',
  napsterImageSize: 's',
  imageRatio: 1,
  imageType: null,
  title: null,
  titleOverflow: true,
  subtitle: null,
  subtitleOverflow: true,
  className: '',
  onClick: null,
}

export default CardRow
