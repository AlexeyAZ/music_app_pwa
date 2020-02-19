import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import SimpleButton from '../SimpleButton'
import NapsterImage from '../NapsterImage'
import { Text } from '../Typography'

import styles from './styles.module.scss'

const AlbumCard = ({ id, imageSize, albumName, artistName, onClick }) => {
  return (
    <SimpleButton className={styles.wrap} onClick={onClick}>
      <div className={styles.imageWrap}>
        <NapsterImage type="album" id={id} size={imageSize} className={styles.image} />
      </div>
      <div className={styles.info}>
        <Text size="xs" overflow>
          {albumName}
        </Text>
        <Text size="xs" color="gray" overflow>
          {artistName}
        </Text>
      </div>
    </SimpleButton>
  )
}

AlbumCard.propTypes = {
  id: PropTypes.string,
  imageSize: PropTypes.string,
  albumName: PropTypes.string,
  artistName: PropTypes.string,
  onClick: PropTypes.func,
}
AlbumCard.defaultProps = {
  id: null,
  imageSize: 's',
  albumName: null,
  artistName: null,
  onClick: noop,
}

export default AlbumCard
