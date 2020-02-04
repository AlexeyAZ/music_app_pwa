import { createAction, createReducer } from 'helpers'

export const setActivePlaylist = createAction('SET_ACTIVE_PLAYLIST')

const playlistsModule = {
	activePlaylist: createReducer(setActivePlaylist, {
		initialState: {
			tracks: [],
			favorites: [],
		},
		customTypes: {
			[setActivePlaylist.start]: (state, payload) => {
				const tracks = payload.tracks || state.tracks
				const favorites = payload.favorites || state.favorites
				return {
					...state,
					tracks,
					favorites,
				}
			},
		},
	}),
}

export default playlistsModule
