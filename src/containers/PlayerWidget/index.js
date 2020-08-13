import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Text } from '../../components'

import * as PlaybackStatusModule from '../../modules/playbackStatus'

import PlayButton from '../PlayButton'
import SkipNextButton from '../SkipNextButton'
import SkipPreviousButton from '../SkipPreviousButton'
import PlayerSeekBar from '../PlayerSeekBar'
import ShuffleButton from '../ShuffleButton'
import RepeatButton from '../RepeatButton'

import styles from './styles.module.scss'

const { trackIdSelector, trackNameSelector, artistNameSelector } = PlaybackStatusModule

const PlayerWidget = ({ trackId, trackName, artistName }) => {
  if (trackId) {
    return (
      <div>
        <div className={styles.wrap}>
          <div className={styles.controls}>
            <SkipPreviousButton />
            <PlayButton />
            <SkipNextButton />
          </div>
          <div className={styles.meta}>
            <Text className={styles.metaText}>{trackName}</Text>
            <Text className={styles.metaText} size="xs">
              {artistName}
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
  trackId: PropTypes.string,
  trackName: PropTypes.string,
  artistName: PropTypes.string,
}
PlayerWidget.defaultProps = {
  trackId: null,
  trackName: null,
  artistName: null,
}

const mapStateToProps = (state) => ({
  trackId: trackIdSelector(state),
  trackName: trackNameSelector(state),
  artistName: artistNameSelector(state),
})

export default connect(mapStateToProps)(PlayerWidget)
