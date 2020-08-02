import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import noop from 'lodash/noop'

import { getTracks } from 'helpers'

import * as TracksModule from 'modules/tracks'
import * as PlaybackListModule from 'modules/playbackList'
import * as TempStorageModule from 'modules/tempStorage'

import TrackRow from '../TrackRow'
import AutoLoadContainer from '../AutoLoadContainer'

// eslint-disable-next-line react/prefer-stateless-function
class TracksGrid extends Component {
  state = {
    mounted: false,
  }

  async componentDidMount() {
    const { clearTempStorage, clearPlaybackListId, storageId, disableAutoload } = this.props
    await clearTempStorage(storageId)
    await clearPlaybackListId()
    if (disableAutoload) {
      await this.getEntity()
    }
    this.setState({ mounted: true })
  }

  getEntity = async params => {
    const { getTracksAction, storageId, data, dataPath, countPatch, customParams } = this.props

    await getTracks({
      action: getTracksAction,
      data,
      dataPath,
      countPatch,
      params: { ...params, ...customParams },
      storageId,
    })
  }

  renderContent = () => {
    const { storageId, tempStorageItems, onFavoriteButtonClick } = this.props

    return tempStorageItems.map(track => {
      return (
        <TrackRow
          track={track}
          key={track.id}
          playbackListId={storageId}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      )
    })
  }

  render() {
    const { mounted } = this.state
    const { disableAutoload, tempStorageItems, tempStorageItemsCount } = this.props

    if (disableAutoload) {
      return <div>{this.renderContent()}</div>
    }

    if (mounted) {
      return (
        <AutoLoadContainer
          customAction={this.getEntity}
          disableAutoLoad={tempStorageItems.length === tempStorageItemsCount}
        >
          {this.renderContent()}
        </AutoLoadContainer>
      )
    }
    return null
  }
}

TracksGrid.propTypes = {
  data: PropTypes.any,
  dataPath: PropTypes.string.isRequired,
  countPatch: PropTypes.string,
  disableAutoload: PropTypes.bool,
  storageId: PropTypes.string.isRequired,
  tempStorageItems: PropTypes.array,
  tempStorageItemsCount: PropTypes.number,
  customParams: PropTypes.object,
  clearTempStorage: PropTypes.func.isRequired,
  clearPlaybackListId: PropTypes.func.isRequired,
  getTracksAction: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func,
}
TracksGrid.defaultProps = {
  data: null,
  countPatch: '',
  disableAutoload: false,
  tempStorageItems: [],
  tempStorageItemsCount: null,
  customParams: {},
  onFavoriteButtonClick: noop,
}

const mapStateToProps = (state, props) => ({
  tempStorageItems: TempStorageModule.getTempStorageItemsByIdSelector(state, props.storageId),
  tempStorageItemsCount: TempStorageModule.getTempStorageItemsCountByIdSelector(
    state,
    props.storageId
  ),
})

const mapDispatchToProps = dispatch => ({
  getTopTracks: bindActionCreators(TracksModule.getTopTracks, dispatch),
  clearPlaybackListId: bindActionCreators(PlaybackListModule.clearPlaybackListId, dispatch),
  clearTempStorage: bindActionCreators(TempStorageModule.clearTempStorage, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksGrid)
