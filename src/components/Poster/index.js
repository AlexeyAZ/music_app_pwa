import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import { Title } from '../Typography'

import styles from './styles.module.scss'

const Poster = ({ napsterImageId, napsterImageType, imageRatio, title }) => {
  return (
    <div className={styles.imageWrap}>
      <Image imageRatio={imageRatio} napsterImageId={napsterImageId} type={napsterImageType} />
      <Title className={styles.imageTitle} color="white" size="xxl">
        {title}
      </Title>
    </div>
  )
}

Poster.propTypes = {
  title: PropTypes.string,
  napsterImageId: PropTypes.string,
  napsterImageType: PropTypes.string,
  imageRatio: PropTypes.number,
}
Poster.defaultProps = {
  title: null,
  napsterImageId: null,
  napsterImageType: null,
  imageRatio: 1,
}

export default Poster
