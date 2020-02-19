import { store } from 'store'
import get from 'lodash/get'

import * as PlaybackListModule from 'modules/playbackList'
import * as FavoritesModule from 'modules/favorites'

const {
  addTracksToTemp,
  addTracksToPlayback,
  setPlaybackListId,
  setTempListId,
  clearTempTracks,
  clearPlaybackTracks,
} = PlaybackListModule
const { addToGeneralFavorites, getFavoritesStatus } = FavoritesModule

const getTracks = async (action, path, params = {}, listId) => {
  const {
    playbackList: { playbackListId, tempListId },
  } = store.getState()
  const tracksResponse = await action({ params })
  const tracksData = get(tracksResponse, path, [])

  if (!playbackListId) {
    await store.dispatch(setPlaybackListId(listId))
  }

  const {
    playbackList: { playbackListId: newPlaybackListId },
  } = store.getState()

  await store.dispatch(setTempListId(listId))

  const {
    playbackList: { tempListId: newTempListId },
  } = store.getState()

  if (tempListId !== newTempListId) {
    await store.dispatch(clearTempTracks())
  }

  if (listId === newTempListId) {
    await store.dispatch(addTracksToTemp(tracksData))
  }

  if (playbackListId !== newPlaybackListId) {
    await store.dispatch(clearPlaybackTracks())
  }

  if (listId === newPlaybackListId) {
    await store.dispatch(addTracksToPlayback(tracksData))
  }

  const tracksIds = tracksData.map(item => item.id)
  const favoritesTracksResponse = await store.dispatch(
    getFavoritesStatus({ data: tracksIds.join() })
  )
  const favoritesTracksData = get(favoritesTracksResponse, 'data.status', [])
    .filter(item => item.favorite === true)
    .map(item => item.id)
  await store.dispatch(addToGeneralFavorites(favoritesTracksData))
  return tracksData
}

export default getTracks
