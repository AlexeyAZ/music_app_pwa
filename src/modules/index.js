import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import modalModule from './modal'
import authModule from './auth'
import playbackStatusModule from './playbackStatus'
import playbackPositionModule from './playbackPosition'
import genresModule from './genres'
import artistsModule from './artists'
import playlistsModule from './playlists'
import favoritesModule from './favorites'
import tracksModule from './tracks'
import playerModule from './player'
import themesModule from './themes'
import iconThemesModule from './iconThemes'
import playbackListModule from './playbackList'
import playbackInfoModule from './playbackInfo'

const { playbackStatus, ...otherPlaybackStatusModule } = playbackStatusModule
const playbackStatusPersistConfig = {
  key: 'playbackStatus',
  storage,
  whitelist: ['isShuffle'],
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
  ...playbackInfoModule,
})

export default rootReducer
