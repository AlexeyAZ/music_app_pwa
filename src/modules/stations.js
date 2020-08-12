import get from 'lodash/get'

import { createAction, createReducer } from 'helpers'

export const getStationDetailSelector = state => get(state, 'stationDetail.data.items[0]')

export const getTopStations = createAction('GET_TOP_STATIONS_REQUEST', {
  url: `/stations/top`,
})

export const getStationDetail = createAction('GET_STATION_DETAIL_REQUEST', id => ({
  url: `/stations/${id}`,
}))

export const getStationTracks = createAction('GET_STATION_TRACKS_REQUEST', id => ({
  url: `/stations/${id}/tracks`,
}))

const stationsModule = {
  topStations: createReducer(getTopStations),
  stationDetail: createReducer(getStationDetail),
  stationTracks: createReducer(getStationTracks),
}

export default stationsModule
