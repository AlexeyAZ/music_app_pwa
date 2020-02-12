import { store as notificationStore } from 'react-notifications-component'
import get from 'lodash/get'
import random from 'lodash/random'
import differenceBy from 'lodash/differenceBy'

import { store } from 'store'

import {
  REPEAT_BUTTON_STATUS_ONE,
  REPEAT_BUTTON_STATUS_ALL,
  REPEAT_BUTTON_STATUS_NONE,
} from 'constants'

import * as PlaybackStatusModule from 'modules/playbackStatus'
import * as PlaybackInfoModule from 'modules/playbackInfo'
import * as PlaybackListModule from 'modules/playbackList'

const { updatePlaybackStatus } = PlaybackStatusModule
const { updatePlaybackInfo } = PlaybackInfoModule
const { clearListened } = PlaybackListModule

const getPlayerTrackId = trackId => {
  return trackId.replace('tra', 'Tra')
}

const getPlayerContext = () => {
  return { context: 'UNKNOWN' }
}

// eslint-disable-next-line no-unused-vars
const getRealTrackId = trackId => {
  return trackId.replace('Tra', 'tra')
}

const getRandomTrackIndex = tracks => {
  const {
    playbackList: { tracks: playbackTracks },
  } = store.getState()
  if (tracks) {
    return random(0, tracks.length - 1)
  }
  return random(0, playbackTracks.length - 1)
}

const getPreviousTrackIndex = () => {
  const {
    playbackList: { tracks },
    playbackInfo: { id: playbackId },
  } = store.getState()
  const tracksCount = tracks.length
  const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
  if (currentTrackIndex - 1 < 0) {
    return tracksCount - 1
  }
  return currentTrackIndex - 1
}

const resumeTrack = trackId => {
  const {
    player: { instance },
  } = store.getState()
  instance.resume(trackId, this.getPlayerContext())
}

const seekTrack = (trackId, time) => {
  const {
    player: { instance },
  } = store.getState()
  instance.seek(getPlayerTrackId(trackId), time, getPlayerContext())
}

const playTrackAsync = async track => {
  const {
    player: { instance },
  } = store.getState()
  const trackId = get(track, 'id')

  await store.dispatch(updatePlaybackStatus({ isTrackLoaded: false, isPlaying: false }))
  await store.dispatch(updatePlaybackInfo(track))

  instance.play(getPlayerTrackId(trackId), getPlayerContext())
}

const pauseTrackAsync = async () => {
  const {
    player: { instance },
  } = store.getState()
  await store.dispatch(updatePlaybackStatus({ isPlaying: false }))
  instance.pause()
}

const playControlAsync = async track => {
  const {
    playbackList: { listened },
    playbackStatus: { isPlaying, isShuffle, repeat, isTrackEnded },
    playbackInfo,
    playbackInfo: { id: playbackTrackId },
  } = store.getState()

  const trackId = get(track, 'id')
  const isCurrent = trackId === playbackTrackId
  const isNeedClearListened =
    isShuffle && repeat === REPEAT_BUTTON_STATUS_NONE && listened.length !== 0

  if (isPlaying) {
    if (!trackId || isCurrent) {
      return pauseTrackAsync()
    }
    if (isNeedClearListened) {
      await store.dispatch(clearListened())
    }
    await playTrackAsync(track)
  }
  if (isCurrent && !isTrackEnded) {
    return resumeTrack(trackId)
  }
  if (!trackId && playbackTrackId && !isTrackEnded) {
    return resumeTrack(playbackTrackId)
  }

  if (isNeedClearListened) {
    await store.dispatch(clearListened())
  }
  // if !trackId && !playbackTrackId && !isPlaying
  return playTrackAsync(track || playbackInfo)
}

const previousTrackAsync = () => {
  const {
    playbackList: { tracks },
  } = store.getState()
  const previousTrackIndex = getPreviousTrackIndex()
  const previousTrackId = tracks[previousTrackIndex]
  playControlAsync(previousTrackId)
}

const nextTrackAsync = async () => {
  const {
    playbackList: { tracks, listened },
    playbackInfo,
    playbackInfo: { id: playbackId },
    playbackStatus: { isShuffle, repeat },
    addToListened,
  } = store.getState()

  if (repeat === REPEAT_BUTTON_STATUS_ONE) {
    return playTrackAsync(playbackInfo)
  }

  const tracksCount = tracks.length
  const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)

  if (repeat === REPEAT_BUTTON_STATUS_ALL) {
    if (isShuffle) {
      const nextTrackIndex = getRandomTrackIndex()
      return playTrackAsync(tracks[nextTrackIndex])
    }
    const nextTrackIndex = currentTrackIndex + 1
    if (tracksCount !== nextTrackIndex) {
      return playTrackAsync(tracks[nextTrackIndex])
    }
    return playTrackAsync(tracks[0])
  }

  if (repeat === REPEAT_BUTTON_STATUS_NONE) {
    if (isShuffle) {
      const allTracks = differenceBy(tracks, listened, [playbackInfo], 'id')
      await store.dispatch(addToListened(playbackInfo))
      if (allTracks.length !== 0) {
        const nextTrackIndex = getRandomTrackIndex(allTracks)
        return playTrackAsync(allTracks[nextTrackIndex])
      }
      return null
    }
    const nextTrackIndex = currentTrackIndex + 1
    if (tracksCount !== nextTrackIndex) {
      return playTrackAsync(tracks[nextTrackIndex])
    }
  }
  return null
}

// eslint-disable-next-line no-unused-vars
const setVolume = value => {
  const {
    player: { instance },
  } = store.getState()
  instance.setVolume(value)
}

const createNotification = message => {
  notificationStore.addNotification({
    title: 'Error',
    message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
  })
}

export default {
  playTrackAsync,
  pauseTrackAsync,
  previousTrackAsync,
  nextTrackAsync,
  playControlAsync,
  seekTrack,
  createNotification,
}
