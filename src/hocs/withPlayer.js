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

import * as PlayerModule from 'modules/player'
import * as PlaybackStatusModule from 'modules/playbackStatus'
import * as PlaybackPositionModule from 'modules/playbackPosition'
import * as PlaybackInfoModule from 'modules/playbackInfo'
import * as PlaybackListModule from 'modules/playbackList'

import { store } from '../store'

const { DrmStreamingPlayer } = window

const withPlayer = WrappedComponent => {
  class WithPlayerHOC extends Component {
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

    initPlayerMethods = () => {
      // player.player.on('play', e => {
      //   console.log(e)
      // })
      // player.player.on('pause', e => {
      //   console.log(e)
      // })
      // player.player.on('loadedmetadata', e => {
      //   console.log(e)
      // })
      // player.player.on('ended', e => {
      //   console.log(e)
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

      player.callbackHandler('trackProgress', () => {
        const storeState = store.getState()
        const isPlaying = get(storeState, 'playbackStatus.isPlaying')
        if (!isPlaying) {
          updatePlaybackStatus({ isPlaying: true })
        }
        updatePlaybackPosition({ position: player.currentTime() })
      })
      // eslint-disable-next-line no-unused-vars
      player.callbackHandler('trackLoaded', meta => {
        console.log(`WithPlayerHOC -> trackLoaded`)
        updatePlaybackStatus({
          isPlaying: true,
          isTrackLoaded: true,
        })
      })
      player.callbackHandler('trackEnded', async () => {
        console.log('WithPlayerHOC -> trackEnded')
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
      console.log('withPlayer -> initPlayer:', player)

      this.initMediaSessionHandlers()
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

      await updatePlaybackStatus({ isTrackLoaded: false, isPlaying: false, isTrackEnded: false })
      await updatePlaybackInfo(track)

      instance.play(this.getPlayerTrackId(trackId), this.getPlayerContext())
    }

    advPlayTrackAsync = async track => {
      const {
        playbackList: { listened },
        playbackStatus: { isPlaying, isTrackEnded, isShuffle, repeat },
        playbackInfo,
        playbackInfo: { id: playbackTrackId },
        clearListened,
      } = this.props

      const trackId = get(track, 'id')

      if (isPlaying) {
        if (!trackId || trackId === playbackTrackId) {
          return this.pauseTrackAsync()
        }
        if (isShuffle && repeat === REPEAT_BUTTON_STATUS_NONE && listened.length !== 0) {
          await clearListened()
        }
        await this.playTrackAsync(track)
      }
      if (trackId === playbackTrackId && !isTrackEnded) {
        return this.resumeTrack(trackId)
      }
      if (!trackId && playbackTrackId && !isTrackEnded) {
        return this.resumeTrack(playbackTrackId)
      }

      if (isShuffle && repeat === REPEAT_BUTTON_STATUS_NONE && listened.length !== 0) {
        await clearListened()
      }
      // if !trackId && !playbackTrackId && !isPlaying
      return this.playTrackAsync(track || playbackInfo)
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
        updatePlaybackStatus,
        updatePlaybackPosition,
        addToListened,
      } = this.props

      await updatePlaybackStatus({ isPlaying: false, isTrackEnded: true })
      await updatePlaybackPosition({ position: 0 })

      if (repeat === REPEAT_BUTTON_STATUS_ONE) {
        return this.advPlayTrackAsync(playbackInfo)
      }

      const tracksCount = tracks.length
      const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)

      if (repeat === REPEAT_BUTTON_STATUS_ALL) {
        if (isShuffle) {
          const nextTrackIndex = this.getRandomTrackIndex()
          return this.advPlayTrackAsync(tracks[nextTrackIndex])
        }
        const nextTrackIndex = currentTrackIndex + 1
        if (tracksCount !== nextTrackIndex) {
          return this.advPlayTrackAsync(tracks[nextTrackIndex])
        }
        return this.advPlayTrackAsync(tracks[0])
      }

      if (repeat === REPEAT_BUTTON_STATUS_NONE) {
        if (isShuffle) {
          const allTracks = differenceBy(tracks, listened, [playbackInfo], 'id')
          await addToListened(playbackInfo)
          if (allTracks.length !== 0) {
            const nextTrackIndex = this.getRandomTrackIndex(allTracks)
            return this.playTrackAsync(allTracks[nextTrackIndex])
          }
          return null
        }
        const nextTrackIndex = currentTrackIndex + 1
        if (tracksCount !== nextTrackIndex) {
          return this.advPlayTrackAsync(tracks[nextTrackIndex])
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
          <video-js id="napster-streaming-player" playsinline style={{ display: 'none' }} />
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
