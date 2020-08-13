import { store as notificationStore } from 'react-notifications-component'
import get from 'lodash/get'
import random from 'lodash/random'
import differenceBy from 'lodash/differenceBy'

import { store } from '../store'

import { napsterImageSizes } from '../config'

import {
  REPEAT_BUTTON_STATUS_ONE,
  REPEAT_BUTTON_STATUS_ALL,
  REPEAT_BUTTON_STATUS_NONE,
} from '../constants'

import getNapsterImage from './getNapsterImage'

import * as PlaybackStatusModule from '../modules/playbackStatus'
import * as PlaybackListModule from '../modules/playbackList'
import * as PlaybackPositionModule from '../modules/playbackPosition'
import * as TempStorageModule from '../modules/tempStorage'

const { updatePlaybackStatus } = PlaybackStatusModule
const { addToListened, clearListened, setPlaybackList } = PlaybackListModule
const { updatePlaybackPosition } = PlaybackPositionModule
const { getTempStorageItemsByIdSelector } = TempStorageModule

const setMediaSessionData = (track) => {
  if (track) {
    const trackSizes = napsterImageSizes.track
    const artwork = Object.keys(trackSizes).map((size) => ({
      src: getNapsterImage({ type: 'album', id: track.albumId, size }),
      sizes: trackSizes[size],
      type: 'image/jpg',
    }))
    // eslint-disable-next-line no-undef
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: track.artistName,
      album: track.albumName,
      artwork,
    })
  }
}

const getPlayerTrackId = (trackId) => {
  return trackId.replace('tra', 'Tra')
}

const getPlayerContext = () => {
  return { context: 'UNKNOWN' }
}

// eslint-disable-next-line no-unused-vars
const getRealTrackId = (trackId) => {
  return trackId.replace('Tra', 'tra')
}

const getRandomTrack = (tracks) => {
  const randomIndex = random(0, tracks.length - 1)
  return tracks[randomIndex]
}

const getOnlyStreamableTracks = (tracks) => tracks.filter((track) => track.isStreamable)

const getPreviousTrackIndex = () => {
  const {
    playbackStatus: {
      track: { id: playbackId },
    },
    playbackList: { playbackTracks },
  } = store.getState()
  const tracksCount = playbackTracks.length
  const currentTrackIndex = playbackTracks.findIndex((track) => track.id === playbackId)
  if (currentTrackIndex - 1 < 0) {
    return tracksCount - 1
  }
  return currentTrackIndex - 1
}

const resumeTrack = (trackId) => {
  const {
    player: { instance },
  } = store.getState()
  instance.resume(trackId, getPlayerContext())
}

const playTrackAsync = async (track) => {
  const {
    player: { instance },
  } = store.getState()
  const trackId = get(track, 'id')
  setMediaSessionData(track)

  await store.dispatch(
    updatePlaybackStatus({ isTrackLoaded: false, isPlaying: false, isTrackEnded: false, track })
  )

  instance.play(getPlayerTrackId(trackId), getPlayerContext())
}

const pauseTrackAsync = async () => {
  const {
    player: { instance },
  } = store.getState()
  await store.dispatch(updatePlaybackStatus({ isPlaying: false }))
  instance.pause()
}

const playControlAsync = async (track, playbackListId) => {
  const {
    playbackList: { listened },
    playbackStatus: {
      isPlaying,
      isShuffle,
      repeat,
      isTrackEnded,
      track: playbackTrack,
      track: { id: playbackTrackId },
    },
    ...state
  } = store.getState()

  const trackId = get(track, 'id')
  const isCurrent = trackId === playbackTrackId
  const isNeedClearListened =
    isShuffle && repeat === REPEAT_BUTTON_STATUS_NONE && listened.length !== 0

  if (trackId) {
    const playbackTracks = getTempStorageItemsByIdSelector(state, playbackListId)
    await store.dispatch(setPlaybackList({ id: playbackListId, tracks: playbackTracks }))
  }

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
  return playTrackAsync(track || playbackTrack)
}

const previousTrackAsync = () => {
  const {
    playbackList: { playbackTracks },
  } = store.getState()
  const previousTrackIndex = getPreviousTrackIndex()
  const previousTrackId = playbackTracks[previousTrackIndex]
  playControlAsync(previousTrackId)
}

const nextTrackAsync = async () => {
  const {
    playbackList: { playbackTracks, listened },
    playbackStatus: {
      isShuffle,
      repeat,
      track: playbackTrack,
      track: { id: playbackId },
    },
  } = store.getState()

  await store.dispatch(updatePlaybackStatus({ isPlaying: false, isTrackEnded: true }))
  await store.dispatch(updatePlaybackPosition({ position: 0 }))
  await store.dispatch(addToListened(playbackTrack))

  if (repeat === REPEAT_BUTTON_STATUS_ONE) {
    return playTrackAsync(playbackTrack)
  }

  const streamableTracks = getOnlyStreamableTracks(playbackTracks)
  const tracksCount = streamableTracks.length
  const currentTrackIndex = streamableTracks.findIndex((track) => track.id === playbackId)
  const nextTrackIndex = currentTrackIndex + 1

  if (repeat === REPEAT_BUTTON_STATUS_ALL) {
    if (isShuffle) {
      const allTracks = differenceBy(streamableTracks, [playbackTrack], 'id')
      const nextTrack = getRandomTrack(allTracks)
      return playTrackAsync(nextTrack)
    }
    if (tracksCount !== nextTrackIndex) {
      return playTrackAsync(streamableTracks[nextTrackIndex])
    }
    return playTrackAsync(streamableTracks[0])
  }

  if (repeat === REPEAT_BUTTON_STATUS_NONE) {
    if (isShuffle) {
      const allTracks = differenceBy(streamableTracks, listened, [playbackTrack], 'id')
      if (allTracks.length !== 0) {
        const nextTrack = getRandomTrack(allTracks)
        return playTrackAsync(nextTrack)
      }
      return null
    }
    if (tracksCount !== nextTrackIndex) {
      return playTrackAsync(streamableTracks[nextTrackIndex])
    }
  }
  return null
}

const seekTrack = (trackId, time) => {
  const {
    player: { instance },
  } = store.getState()
  instance.seek(getPlayerTrackId(trackId), time, getPlayerContext())
}

// eslint-disable-next-line no-unused-vars
const setVolume = (value) => {
  const {
    player: { instance },
  } = store.getState()
  instance.setVolume(value)
}

const createNotification = (message) => {
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
