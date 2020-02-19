import { createAction, createReducer } from 'helpers'

export const getTopStations = createAction('GET_TOP_STATIONS_REQUEST', {
  url: `/stations/top`,
})

const stationsModule = {
  topStations: createReducer(getTopStations),
}

export default stationsModule
