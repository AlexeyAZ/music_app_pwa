import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import SimpleButton from '../SimpleButton'
import NapsterImage from '../NapsterImage'
import { Text } from '../Typography'

import styles from './styles.module.scss'

const ArtistCard = ({ id, imageSize, name, onClick }) => {
  return (
    <SimpleButton className={styles.wrap} onClick={onClick}>
      <div className={styles.imageWrap}>
        <NapsterImage type="artist" id={id} size={imageSize} className={styles.image} />
      </div>
      <div className={styles.info}>
        <Text size="xs" overflow>
          {name}
        </Text>
      </div>
    </SimpleButton>
  )
}

ArtistCard.propTypes = {
  id: PropTypes.string,
  imageSize: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
}
ArtistCard.defaultProps = {
  id: null,
  imageSize: 's',
  name: null,
  onClick: noop,
}

export default ArtistCard
