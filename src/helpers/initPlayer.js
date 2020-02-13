import get from 'lodash/get'
import moment from 'moment'

import { napsterConfig } from 'config'
import { store } from 'store'

import * as PlayerModule from 'modules/player'
import * as PlaybackStatusModule from 'modules/playbackStatus'
import * as PlaybackPositionModule from 'modules/playbackPosition'

import { playerControls } from 'helpers'

const {
  playControlAsync,
  pauseTrackAsync,
  previousTrackAsync,
  nextTrackAsync,
  createNotification,
} = playerControls

const { setPlayerInstance } = PlayerModule
const { updatePlaybackStatus } = PlaybackStatusModule
const { updatePlaybackPosition } = PlaybackPositionModule

const { DrmStreamingPlayer } = window

// eslint-disable-next-line no-unused-vars
const initPlayerMethods = player => {
  // player.player.on('play', e => {
  //   console.log(e)
  // })
  // player.player.on('pause', e => {
  //   console.log(e)
  // })
  // player.player.on('loadedmetadata', e => {
  //   console.log('loadedmetadata')
  // })
  // player.player.on('ended', e => {
  //   console.log('ended')
  // })
  // player.player.on('timeupdate', e => {
  //   console.log(e)
  // })
  // player.player.on('error', e => {
  //   console.log(e)
  // })
}

const initMediaSessionHandlers = () => {
  navigator.mediaSession.setActionHandler('play', () => {
    playControlAsync()
  })
  navigator.mediaSession.setActionHandler('pause', () => {
    pauseTrackAsync()
  })
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    previousTrackAsync()
  })
  navigator.mediaSession.setActionHandler('nexttrack', () => {
    nextTrackAsync()
  })
}

const initPlayer = async () => {
  const {
    authOptions: { access_token },
  } = store.getState()

  let date = moment()

  const player = new DrmStreamingPlayer({
    id: 'napster-streaming-player',
    apikey: napsterConfig.clientId,
    token: access_token,
    bitrate: 192,
    downgrade: true,
    currentUser: {},
    env: 'production',
    volume: 1,
  })

  player.callbackHandler('trackProgress', async () => {
    const {
      playbackStatus: { isPlaying },
    } = store.getState()
    if (!isPlaying) {
      await store.dispatch(updatePlaybackStatus({ isPlaying: true, isTrackLoaded: true }))
    }
    const newDate = moment()
    console.log(newDate.diff(date, 'milliseconds'))
    if (newDate.diff(date, 'milliseconds') >= 750) {
      date = newDate
      store.dispatch(updatePlaybackPosition({ position: player.currentTime() }))
    }
  })
  player.callbackHandler('trackLoaded', (/* meta */) => {
    console.log(`initPlayer -> trackLoaded`)
  })
  player.callbackHandler('trackEnded', async () => {
    console.log('initPlayer -> trackEnded')
    await store.dispatch(updatePlaybackStatus({ isPlaying: false, isTrackEnded: true }))
    await store.dispatch(updatePlaybackPosition({ position: 0 }))
    nextTrackAsync()
  })

  player.callbackHandler('error', е => {
    console.log(`initPlayer -> error ->`, е)
    const code = get(е, 'error.code')
    createNotification(code)
    pauseTrackAsync()
  })
  player.callbackHandler('sessionError', е => {
    console.log(`initPlayer -> sessionError ->`, е)
  })
  player.callbackHandler('sessionExpired', e => {
    console.log(`initPlayer -> sessionExpired ->`, e)
  })
  player.callbackHandler('trackError', е => {
    console.log(`initPlayer -> trackError ->`, е)
  })
  player.callbackHandler('reporting', е => {
    console.log(`initPlayer -> reporting ->`, е)
  })

  await store.dispatch(setPlayerInstance(player))

  initMediaSessionHandlers()
  console.log('initPlayer:', player)
}

export default initPlayer
