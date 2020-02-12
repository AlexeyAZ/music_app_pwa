import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Text } from 'components'

import PlayButton from '../PlayButton'
import SkipNextButton from '../SkipNextButton'
import SkipPreviousButton from '../SkipPreviousButton'
import PlayerSeekBar from '../PlayerSeekBar'
import ShuffleButton from '../ShuffleButton'
import RepeatButton from '../RepeatButton'

import styles from './styles.module.scss'

const PlayerWidget = ({ playbackInfo }) => {
  if (playbackInfo.id) {
    return (
      <div>
        <div className={styles.wrap}>
          <div className={styles.controls}>
            <SkipPreviousButton />
            <PlayButton />
            <SkipNextButton />
          </div>
          <div className={styles.meta}>
            <Text className={styles.metaText}>{playbackInfo.name}</Text>
            <Text className={styles.metaText} size="xs">
              {playbackInfo.artistName}
            </Text>
          </div>
          <div className={styles.extraControls}>
            <ShuffleButton />
            <RepeatButton />
          </div>
        </div>
        <div>
          <PlayerSeekBar />
        </div>
      </div>
    )
  }
  return null
}

PlayerWidget.propTypes = {
  playbackInfo: PropTypes.object.isRequired,
}

const mapStateToProps = ({ playbackInfo }) => ({
  playbackInfo,
})

export default connect(mapStateToProps)(PlayerWidget)
