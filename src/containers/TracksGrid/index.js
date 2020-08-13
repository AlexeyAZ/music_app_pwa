import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import noop from 'lodash/noop'
import get from 'lodash/get'

import * as TracksModule from '../../modules/tracks'
import * as PlaybackListModule from '../../modules/playbackList'
import * as TempStorageModule from '../../modules/tempStorage'
import * as FavoritesModule from '../../modules/favorites'

import { Text } from '../../components'
import TrackRow from '../TrackRow'
import LoadContainer from '../LoadContainerNew'

// eslint-disable-next-line react/prefer-stateless-function
class TracksGrid extends Component {
  state = {
    mounted: false,
  }

  async componentDidMount() {
    const { clearTempStorage, clearPlaybackListId, storageId } = this.props
    // await clearTempStorage(storageId)
    await clearPlaybackListId()

    this.setState({ mounted: true })
  }

  handleResponseDataAction = async ({
    storageId,
    responseData,
    responseCount,
    responseReturnedCount,
    query,
    page,
  }) => {
    const {
      playbackListId,
      addTracksToPlayback,
      addItemsToTempStorage,
      getFavoritesStatus,
      addToGeneralFavorites,
    } = this.props

    if (playbackListId === storageId) {
      await addTracksToPlayback(responseData)
    }

    await addItemsToTempStorage({
      storageId,
      items: responseData,
      totalCount: responseCount,
      returnedCount: responseReturnedCount,
      query,
      page,
    })

    const tracksIds = responseData.map((item) => item.id)
    if (tracksIds.length > 0) {
      const favoritesTracksResponse = await getFavoritesStatus({ data: tracksIds.join() })
      const favoritesTracksData = get(favoritesTracksResponse, 'data.status', [])
        .filter((item) => item.favorite === true)
        .map((item) => item.id)
      await addToGeneralFavorites(favoritesTracksData)
    }
  }

  renderContent = () => {
    const { storageId, tempStorageItems, tempStorageTotalCount, onFavoriteButtonClick } = this.props
    return (
      <div>
        <Text>Items count:{tempStorageItems.length}</Text>
        <Text>Total count:{tempStorageTotalCount}</Text>
        {tempStorageItems.map((track, index) => (
          <TrackRow
            rowNumber={index + 1}
            track={track}
            key={track.id}
            playbackListId={storageId}
            onFavoriteButtonClick={onFavoriteButtonClick}
          />
        ))}
      </div>
    )
  }

  render() {
    const { mounted } = this.state
    const {
      dataPath,
      countPatch,
      storageId,
      disableAutoLoad,
      requestParams,
      requestData,
      getTracksAction,
    } = this.props

    if (mounted) {
      return (
        <LoadContainer
          storageId={storageId}
          entityDataPatch={dataPath}
          entityCountPatch={countPatch}
          requestAction={getTracksAction}
          requestParams={requestParams}
          requestData={requestData}
          onResponseDataAction={this.handleResponseDataAction}
          disableLoadOnScroll={disableAutoLoad}
        >
          {this.renderContent()}
        </LoadContainer>
      )
    }
    return null
  }
}

TracksGrid.propTypes = {
  requestData: PropTypes.any,
  dataPath: PropTypes.string,
  countPatch: PropTypes.string,
  disableAutoLoad: PropTypes.bool,
  storageId: PropTypes.string.isRequired,
  tempStorageItems: PropTypes.array,
  requestParams: PropTypes.object,
  tempStorageTotalCount: PropTypes.number,
  playbackListId: PropTypes.string,
  clearTempStorage: PropTypes.func.isRequired,
  clearPlaybackListId: PropTypes.func.isRequired,
  getTracksAction: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func,
  addTracksToPlayback: PropTypes.func.isRequired,
  addItemsToTempStorage: PropTypes.func.isRequired,
  getFavoritesStatus: PropTypes.func.isRequired,
  addToGeneralFavorites: PropTypes.func.isRequired,
}
TracksGrid.defaultProps = {
  requestData: null,
  dataPath: null,
  countPatch: '',
  disableAutoLoad: false,
  tempStorageItems: [],
  requestParams: {},
  tempStorageTotalCount: null,
  playbackListId: null,
  onFavoriteButtonClick: noop,
}

const mapStateToProps = (state, props) => ({
  tempStorageItems: TempStorageModule.getTempStorageItemsByIdSelector(state, props.storageId),
  tempStorageTotalCount: TempStorageModule.getTempStorageTotalCountByIdSelector(
    state,
    props.storageId
  ),
  playbackListId: PlaybackListModule.getPlaybackListIdSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  getTopTracks: bindActionCreators(TracksModule.getTopTracks, dispatch),
  clearPlaybackListId: bindActionCreators(PlaybackListModule.clearPlaybackListId, dispatch),
  clearTempStorage: bindActionCreators(TempStorageModule.clearTempStorage, dispatch),
  addTracksToPlayback: bindActionCreators(PlaybackListModule.addTracksToPlayback, dispatch),
  addItemsToTempStorage: bindActionCreators(TempStorageModule.addItemsToTempStorage, dispatch),
  getFavoritesStatus: bindActionCreators(FavoritesModule.getFavoritesStatus, dispatch),
  addToGeneralFavorites: bindActionCreators(FavoritesModule.addToGeneralFavorites, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(TracksGrid)
