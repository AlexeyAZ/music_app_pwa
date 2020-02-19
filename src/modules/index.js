import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import modalModule from './modal'
import authModule from './auth'
import playbackStatusModule from './playbackStatus'
import playbackPositionModule from './playbackPosition'
import genresModule from './genres'
import artistsModule from './artists'
import favoritesModule from './favorites'
import tracksModule from './tracks'
import playerModule from './player'
import themesModule from './themes'
import iconThemesModule from './iconThemes'
import playbackListModule from './playbackList'
import albumsModule from './albums'
import playlistsModule from './playlists'
import stationsModule from './stations'
import gridModule from './grid'

const { playbackStatus, ...otherPlaybackStatusModule } = playbackStatusModule
const playbackStatusPersistConfig = {
  key: 'playbackStatus',
  storage,
  whitelist: ['isShuffle', 'repeat'],
}

const rootReducer = combineReducers({
  ...modalModule,
  ...authModule,
  playbackStatus: persistReducer(playbackStatusPersistConfig, playbackStatus),
  ...otherPlaybackStatusModule,
  ...playbackPositionModule,
  ...genresModule,
  ...artistsModule,
  ...playlistsModule,
  ...favoritesModule,
  ...tracksModule,
  ...playerModule,
  ...themesModule,
  ...iconThemesModule,
  ...playbackListModule,
  ...albumsModule,
  ...playlistsModule,
  ...stationsModule,
  ...gridModule,
})

export default rootReducer
