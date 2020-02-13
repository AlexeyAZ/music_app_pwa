import { store } from 'store'
import get from 'lodash/get'

import * as PlaybackListModule from 'modules/playbackList'
import * as FavoritesModule from 'modules/favorites'

const { setPlaybackList } = PlaybackListModule
const { addToGeneralFavorites, getFavoritesStatus } = FavoritesModule

const getTracks = async (action, path, params = {}) => {
  const tracksResponse = await action({ params })
  const tracksData = get(tracksResponse, path, [])
  await store.dispatch(setPlaybackList({ tempTracks: tracksData }))
  const tracksIds = tracksData.map(item => item.id)
  const favoritesTracksResponse = await store.dispatch(
    getFavoritesStatus({ params: { ids: tracksIds.join() } })
  )
  const favoritesTracksData = get(favoritesTracksResponse, 'data.status', [])
    .filter(item => item.favorite === true)
    .map(item => item.id)
  await store.dispatch(addToGeneralFavorites(favoritesTracksData))
}

export default getTracks
