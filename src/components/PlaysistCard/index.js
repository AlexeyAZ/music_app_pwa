import React from 'react'
import PropTypes from 'prop-types'

import NapsterImage from '../NapsterImage'
import { Text } from '../Typography'

import styles from './styles.module.scss'

const PlaysistCard = ({ id, imageSize, name }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.imageWrap}>
        <NapsterImage type="playlist" id={id} size={imageSize} className={styles.image} />
      </div>
      <div className={styles.info}>
        <Text size="xs" overflow>
          {name}
        </Text>
      </div>
    </div>
  )
}

PlaysistCard.propTypes = {
  id: PropTypes.string,
  imageSize: PropTypes.string,
  name: PropTypes.string,
}
PlaysistCard.defaultProps = {
  id: null,
  imageSize: 's',
  name: null,
}

export default PlaysistCard
