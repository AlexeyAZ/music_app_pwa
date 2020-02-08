import { combineReducers } from 'redux'

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

const rootReducer = combineReducers({
  ...modalModule,
  ...authModule,
  ...playbackStatusModule,
  ...playbackPositionModule,
  ...genresModule,
  ...artistsModule,
  ...playlistsModule,
  ...favoritesModule,
  ...tracksModule,
  ...playerModule,
  ...themesModule,
  ...iconThemesModule,
})

export default rootReducer
