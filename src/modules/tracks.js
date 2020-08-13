import { createAction, createReducer } from '../helpers'

export const getTopTracks = createAction('GET_TOP_TRACKS_REQUEST', {
  url: `/tracks/top`,
})

const tracksModule = {
  topTracks: createReducer(getTopTracks),
}

export default tracksModule
