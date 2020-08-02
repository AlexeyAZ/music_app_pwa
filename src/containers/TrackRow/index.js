import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import noop from 'lodash/noop'

import { Text } from 'components'
import PlayButton from '../PlayButton'
import FavoriteButton from '../FavoriteButton'

import styles from './styles.module.scss'

// eslint-disable-next-line react/prefer-stateless-function
class TrackRow extends Component {
  render() {
    const { track, playbackListId, className, onFavoriteButtonClick } = this.props
    return (
      <div className={cn(styles.wrap, className)}>
        <PlayButton
          iconSize="m"
          track={track}
          className={styles.playButton}
          playbackListId={playbackListId}
          disabled={!track.isStreamable}
        />
        <div>
          <Text>{track.name}</Text>
          <Text size="xs">{track.artistName}</Text>
        </div>
        <div className={styles.actions}>
          <FavoriteButton
            onFavoriteButtonClick={onFavoriteButtonClick}
            iconSize="s"
            trackId={track.id}
          />
        </div>
      </div>
    )
  }
}

TrackRow.propTypes = {
  className: PropTypes.string,
  track: PropTypes.object.isRequired,
  artistName: PropTypes.string,
  playbackListId: PropTypes.string,
  onFavoriteButtonClick: PropTypes.func,
}
TrackRow.defaultProps = {
  className: '',
  artistName: '',
  playbackListId: null,
  onFavoriteButtonClick: noop,
}

export default TrackRow
