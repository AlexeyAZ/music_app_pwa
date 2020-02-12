import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import cn from 'classnames'

import * as PlaybackPositionModule from 'modules/playbackPosition'

import { Text } from 'components'
import PlayButton from '../PlayButton'

import styles from './styles.module.scss'

class TrackRow extends Component {
  render() {
    const { track, className } = this.props
    return (
      <div className={cn(styles.wrap, className)}>
        <PlayButton track={track} className={styles.playButton} />
        <div>
          <Text>{track.name}</Text>
          <Text size="xs">{track.artistName}</Text>
        </div>
      </div>
    )
  }
}

TrackRow.propTypes = {
  className: PropTypes.string,
  track: PropTypes.object.isRequired,
  artistName: PropTypes.string,
}
TrackRow.defaultProps = {
  className: '',
  artistName: '',
}

export default TrackRow
