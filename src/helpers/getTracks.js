import { store } from 'store'
import get from 'lodash/get'

import * as PlaybackListModule from 'modules/playbackList'
import * as TempStorageModule from 'modules/tempStorage'
import * as FavoritesModule from 'modules/favorites'

const { addTracksToPlayback } = PlaybackListModule
const { addItemsToTempStorage } = TempStorageModule
const { addToGeneralFavorites, getFavoritesStatus } = FavoritesModule

const getTracks = async ({ action, data = null, dataPath, countPatch, params = {}, storageId }) => {
  const {
    playbackList: { playbackListId },
  } = store.getState()
  const actionPayload = data ? { params, data } : { params }
  const tracksResponse = await action(actionPayload)
  const tracksData = get(tracksResponse, dataPath, [])
  const tracksCount = get(tracksResponse, countPatch)

  if (playbackListId === storageId) {
    await store.dispatch(addTracksToPlayback(tracksData))
    await store.dispatch(
      addItemsToTempStorage({ storageId, items: tracksData, itemsCount: tracksCount })
    )
  } else {
    await store.dispatch(
      addItemsToTempStorage({ storageId, items: tracksData, itemsCount: tracksCount })
    )
  }

  const tracksIds = tracksData.map(item => item.id)
  if (tracksIds.length > 0) {
    const favoritesTracksResponse = await store.dispatch(
      getFavoritesStatus({ data: tracksIds.join() })
    )
    const favoritesTracksData = get(favoritesTracksResponse, 'data.status', [])
      .filter(item => item.favorite === true)
      .map(item => item.id)
    await store.dispatch(addToGeneralFavorites(favoritesTracksData))
  }

  return tracksData
}

export default getTracks
