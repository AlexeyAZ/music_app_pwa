import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import SimpleButton from '../../SimpleButton'
import Image from '../../Image'
import { Text } from '../../Typography'

import styles from './styles.module.scss'

const CommonCard = ({
  id,
  imageSize,
  imageRatio,
  imageType,
  title,
  borderRadius,
  subtitle,
  onClick,
}) => {
  return (
    <SimpleButton className={styles.wrap} onClick={onClick}>
      <Image
        type={imageType}
        id={id}
        size={imageSize}
        borderRadius={borderRadius}
        imageRatio={imageRatio}
        className={styles.image}
      />
      <div className={styles.info}>
        <Text size="xs" overflow>
          {title}
        </Text>
        <Text size="xs" color="gray" overflow>
          {subtitle}
        </Text>
      </div>
    </SimpleButton>
  )
}

CommonCard.propTypes = {
  borderRadius: PropTypes.oneOf(['default', 'xs', 's', 'm', 'l', 'round']),
  id: PropTypes.string,
  imageSize: PropTypes.string,
  imageRatio: PropTypes.number,
  imageType: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onClick: PropTypes.func,
}
CommonCard.defaultProps = {
  borderRadius: 'default',
  id: null,
  imageSize: 's',
  imageRatio: 1,
  imageType: null,
  title: null,
  subtitle: null,
  onClick: noop,
}

export default CommonCard
