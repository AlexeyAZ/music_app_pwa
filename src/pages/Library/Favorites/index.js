import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import * as FavoritesModule from 'modules/favorites'
import * as TempStorageModule from 'modules/tempStorage'
import * as PlaybackListModule from 'modules/playbackList'

import { Input } from 'components'

import TracksGrid from '../../../containers/TracksGrid'

const storageId = 'libraryFavorites'

class Favorites extends Component {
  state = {
    isShowAddFavoritesForm: false,
  }

  inputValue = ''

  getFavoritesIds = async () => {
    const { getMyFavorites } = this.props
    const result = await getMyFavorites({ params: { limit: 200 } })
    const ids = (get(result, 'data.favorites.data.tracks') || []).map(track => track.id).join()
    console.log(ids)
  }

  addFavorites = async () => {
    const { addToFavoritesMultiple } = this.props
    const ids = this.inputValue.split(',')
    await addToFavoritesMultiple({ data: ids })
    this.hideAddFavoritesForm()
  }

  removeFromFavorites = async trackId => {
    const { playbackListId, removeItemsFromTempStorage, removeTracksFromPlayback } = this.props
    await removeItemsFromTempStorage({ storageId, itemsIds: [trackId] })
    if (playbackListId === storageId) {
      removeTracksFromPlayback({ tracksIds: [trackId] })
    }
  }

  handleInputChange = value => {
    this.inputValue = value
  }

  showAddFavoritesForm = () => {
    this.setState({ isShowAddFavoritesForm: true })
  }

  hideAddFavoritesForm = () => {
    this.setState({ isShowAddFavoritesForm: false })
  }

  render() {
    const { isShowAddFavoritesForm } = this.state
    const { getMyFavorites } = this.props
    return (
      <div>
        <button onClick={this.getFavoritesIds} type="button">
          Get favorites ids
        </button>
        <button onClick={this.showAddFavoritesForm} type="button">
          Add favorites by id
        </button>
        {isShowAddFavoritesForm && (
          <div>
            <Input onChange={this.handleInputChange} />
            <button onClick={this.addFavorites} type="button">
              Add
            </button>
          </div>
        )}
        <TracksGrid
          getTracksAction={getMyFavorites}
          storageId={storageId}
          dataPath="data.favorites.data.tracks"
          countPatch="data.meta.totalCount"
          onFavoriteButtonClick={this.removeFromFavorites}
        />
      </div>
    )
  }
}

Favorites.propTypes = {
  playbackListId: PropTypes.string,
  getMyFavorites: PropTypes.func.isRequired,
  addToFavoritesMultiple: PropTypes.func.isRequired,
  removeItemsFromTempStorage: PropTypes.func.isRequired,
  removeTracksFromPlayback: PropTypes.func.isRequired,
}
Favorites.defaultProps = {
  playbackListId: null,
}

const mapStateToProps = state => ({
  playbackListId: PlaybackListModule.getPlaybackListIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
  getMyFavorites: bindActionCreators(FavoritesModule.getMyFavorites, dispatch),
  addToFavoritesMultiple: bindActionCreators(FavoritesModule.addToFavoritesMultiple, dispatch),
  removeItemsFromTempStorage: bindActionCreators(
    TempStorageModule.removeItemsFromTempStorage,
    dispatch
  ),
  removeTracksFromPlayback: bindActionCreators(
    PlaybackListModule.removeTracksFromPlayback,
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
