import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { store as notificationStore } from 'react-notifications-component'
import get from 'lodash/get'
import random from 'lodash/random'
import differenceBy from 'lodash/differenceBy'

import {
  REPEAT_BUTTON_STATUS_ONE,
  REPEAT_BUTTON_STATUS_ALL,
  REPEAT_BUTTON_STATUS_NONE,
} from 'constants'

import { napsterConfig } from 'config'
import { playerControls } from 'helpers'

import * as PlayerModule from 'modules/player'
import * as PlaybackStatusModule from 'modules/playbackStatus'
import * as PlaybackPositionModule from 'modules/playbackPosition'
import * as PlaybackInfoModule from 'modules/playbackInfo'
import * as PlaybackListModule from 'modules/playbackList'

import { store } from '../store'

const { DrmStreamingPlayer } = window
const { playTrackAsync } = playerControls

const withPlayer = WrappedComponent => {
  class WithPlayerHOC extends Component {
    // shouldComponentUpdate(nextProps) {
    //   return false
    // }

    createNotification = message => {
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

    initPlayerMethods = player => {
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

    initMediaSessionHandlers = () => {
      navigator.mediaSession.setActionHandler('play', () => {
        this.advPlayTrackAsync()
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        this.pauseTrackAsync()
      })
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.previousTrack()
      })
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.nextTrackAsync()
      })
    }

    initPlayer = async () => {
      const {
        authOptions,
        setPlayerInstance,
        updatePlaybackPosition,
        updatePlaybackStatus,
      } = this.props

      const player = new DrmStreamingPlayer({
        id: 'napster-streaming-player',
        apikey: napsterConfig.clientId,
        token: authOptions.access_token,
        bitrate: 192,
        downgrade: true,
        currentUser: {},
        env: 'production',
        volume: 1,
      })

      player.callbackHandler('trackProgress', async () => {
        const storeState = store.getState()
        const isPlaying = get(storeState, 'playbackStatus.isPlaying')
        if (!isPlaying) {
          await updatePlaybackStatus({ isPlaying: true, isTrackLoaded: true })
        }
        updatePlaybackPosition({ position: player.currentTime() })
      })
      player.callbackHandler('trackLoaded', (/* meta */) => {
        console.log(`WithPlayerHOC -> trackLoaded`)
      })
      player.callbackHandler('trackEnded', async () => {
        console.log('WithPlayerHOC -> trackEnded')
        await updatePlaybackStatus({ isPlaying: false, isTrackEnded: true })
        await updatePlaybackPosition({ position: 0 })
        this.nextTrackAsync()
      })

      player.callbackHandler('error', е => {
        console.log(`WithPlayerHOC -> error ->`, е)
        const code = get(е, 'error.code')
        this.createNotification(code)
        this.pauseTrackAsync()
      })
      player.callbackHandler('sessionError', е => {
        console.log(`WithPlayerHOC -> sessionError ->`, е)
      })
      player.callbackHandler('sessionExpired', e => {
        console.log(`WithPlayerHOC -> sessionExpired ->`, e)
      })
      player.callbackHandler('trackError', е => {
        console.log(`WithPlayerHOC -> trackError ->`, е)
      })
      player.callbackHandler('reporting', е => {
        console.log(`WithPlayerHOC -> reporting ->`, е)
      })

      await setPlayerInstance(player)

      this.initMediaSessionHandlers()
      this.initPlayerMethods(player)
      console.log('withPlayer -> initPlayer:', player)
    }

    getPlayerTrackId = trackId => {
      return trackId.replace('tra', 'Tra')
    }

    getRealTrackId = trackId => {
      return trackId.replace('Tra', 'tra')
    }

    getPlayerContext = () => {
      return { context: 'UNKNOWN' }
    }

    getRandomTrackIndex = tracks => {
      const {
        playbackList: { tracks: playbackTracks },
      } = this.props
      if (tracks) {
        return random(0, tracks.length - 1)
      }
      return random(0, playbackTracks.length - 1)
    }

    playTrackAsync = async track => {
      const {
        player: { instance },
        updatePlaybackStatus,
        updatePlaybackInfo,
      } = this.props
      const trackId = get(track, 'id')

      await updatePlaybackStatus({ isTrackLoaded: false, isPlaying: false })
      await updatePlaybackInfo(track)

      instance.play(this.getPlayerTrackId(trackId), this.getPlayerContext())
    }

    advPlayTrackAsync = async track => {
      const {
        playbackList: { listened },
        playbackStatus: { isPlaying, isShuffle, repeat, isTrackEnded },
        playbackInfo,
        playbackInfo: { id: playbackTrackId },
        clearListened,
      } = this.props

      const trackId = get(track, 'id')
      const isCurrent = trackId === playbackTrackId
      const isNeedClearListened =
        isShuffle && repeat === REPEAT_BUTTON_STATUS_NONE && listened.length !== 0

      if (isPlaying) {
        if (!trackId || isCurrent) {
          return this.pauseTrackAsync()
        }
        if (isNeedClearListened) {
          await clearListened()
        }
        await playTrackAsync(track)
      }
      if (isCurrent && !isTrackEnded) {
        return this.resumeTrack(trackId)
      }
      if (!trackId && playbackTrackId && !isTrackEnded) {
        return this.resumeTrack(playbackTrackId)
      }

      if (isNeedClearListened) {
        await clearListened()
      }
      // if !trackId && !playbackTrackId && !isPlaying
      return playTrackAsync(track || playbackInfo)
    }

    pauseTrackAsync = async () => {
      const {
        player: { instance },
        updatePlaybackStatus,
      } = this.props
      await updatePlaybackStatus({ isPlaying: false })
      instance.pause()
    }

    seekTrack = (trackId, time) => {
      const {
        player: { instance },
      } = this.props
      instance.seek(this.getPlayerTrackId(trackId), time, this.getPlayerContext())
    }

    resumeTrack = trackId => {
      const {
        player: { instance },
      } = this.props
      instance.resume(trackId, this.getPlayerContext())
    }

    previousTrack = () => {
      const {
        playbackList: { tracks },
      } = this.props
      const previousTrackIndex = this.getPreviousTrackIndex()
      const previousTrackId = tracks[previousTrackIndex]
      this.advPlayTrackAsync(previousTrackId)
    }

    nextTrackAsync = async () => {
      const {
        playbackList: { tracks, listened },
        playbackInfo,
        playbackInfo: { id: playbackId },
        playbackStatus: { isShuffle, repeat },
        addToListened,
      } = this.props

      if (repeat === REPEAT_BUTTON_STATUS_ONE) {
        return playTrackAsync(playbackInfo)
      }

      const tracksCount = tracks.length
      const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)

      if (repeat === REPEAT_BUTTON_STATUS_ALL) {
        if (isShuffle) {
          const nextTrackIndex = this.getRandomTrackIndex()
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
          await addToListened(playbackInfo)
          if (allTracks.length !== 0) {
            const nextTrackIndex = this.getRandomTrackIndex(allTracks)
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

    getPreviousTrackIndex = () => {
      const {
        playbackList: { tracks },
        playbackInfo: { id: playbackId },
      } = this.props
      const tracksCount = tracks.length
      const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
      if (currentTrackIndex - 1 < 0) {
        return tracksCount - 1
      }
      return currentTrackIndex - 1
    }

    setVolume = value => {
      const {
        player: { instance },
      } = this.props
      instance.setVolume(value)
    }

    render() {
      const { children, ...rest } = this.props
      return (
        <WrappedComponent
          playTrack={this.playTrackAsync}
          advPlayTrackAsync={this.advPlayTrackAsync}
          pauseTrackAsync={this.pauseTrackAsync}
          previousTrack={this.previousTrack}
          nextTrackAsync={this.nextTrackAsync}
          seekTrack={this.seekTrack}
          initPlayer={this.initPlayer}
          {...rest}
        >
          {children}
        </WrappedComponent>
      )
    }
  }

  WithPlayerHOC.propTypes = {
    player: PropTypes.object.isRequired,
    playbackStatus: PropTypes.object.isRequired,
    playbackInfo: PropTypes.object.isRequired,
    playbackList: PropTypes.object.isRequired,
    children: PropTypes.any,
    authOptions: PropTypes.object.isRequired,
    setPlayerInstance: PropTypes.func.isRequired,
    updatePlaybackStatus: PropTypes.func.isRequired,
    updatePlaybackInfo: PropTypes.func.isRequired,
    addToListened: PropTypes.func.isRequired,
    clearListened: PropTypes.func.isRequired,
    updatePlaybackPosition: PropTypes.func.isRequired,
  }
  WithPlayerHOC.defaultProps = {
    children: null,
  }

  const mapStateToProps = ({
    authOptions,
    player,
    playbackStatus,
    playbackInfo,
    playbackList,
  }) => ({
    authOptions,
    player,
    playbackStatus,
    playbackInfo,
    playbackList,
  })

  const mapDispatchToProps = dispatch => ({
    setPlayerInstance: bindActionCreators(PlayerModule.setPlayerInstance, dispatch),
    updatePlaybackStatus: bindActionCreators(PlaybackStatusModule.updatePlaybackStatus, dispatch),
    updatePlaybackInfo: bindActionCreators(PlaybackInfoModule.updatePlaybackInfo, dispatch),
    addToListened: bindActionCreators(PlaybackListModule.addToListened, dispatch),
    clearListened: bindActionCreators(PlaybackListModule.clearListened, dispatch),
    updatePlaybackPosition: bindActionCreators(
      PlaybackPositionModule.updatePlaybackPosition,
      dispatch
    ),
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithPlayerHOC)
}

export default withPlayer
