import get from 'lodash/get'

import { getFavoriteStatus, addToActiveFavorites } from 'modules/favorites'

import { storeProvider } from 'store'

const getAndUpdateFavoriteTracks = async idsArray => {
	const favoritesTracksResponse = await storeProvider.dispatch(
		getFavoriteStatus({
			data: idsArray,
		})
	)
	const favoritesTracks = get(favoritesTracksResponse, 'data.status', [])
	await storeProvider.dispatch(
		addToActiveFavorites({
			data: favoritesTracks.filter(track => track.favorite === true).map(track => track.id),
		})
	)
}

export default getAndUpdateFavoriteTracks
