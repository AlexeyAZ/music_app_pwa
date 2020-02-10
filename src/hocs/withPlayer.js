import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { store as notificationStore } from 'react-notifications-component'
import get from 'lodash/get'
import random from 'lodash/random'
import differenceBy from 'lodash/differenceBy'

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

    initPlayer = async () => {
      const {
        authOptions,
        playbackStatus: { isShuffle },
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
      await setPlayerInstance(player)
      console.log('withPlayer:', player)

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

    parseError = error => {
      const code = get(error, 'error.code')
      const rawCode = `{${code.split('{')[1].split('}')[0]}}`
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

    getRandomTrackIndex = () => {
      const {
        playbackList: { tracks },
      } = this.props
      return random(0, tracks.length - 1)
    }

    playTrack = trackId => {
      const {
        player: { instance },
      } = this.props
      instance.play(this.getPlayerTrackId(trackId), this.getPlayerContext())
    }

    advPlayTrackAsync = async track => {
      const {
        playbackStatus: { isPlaying, isTrackEnded },
        playbackInfo: { id: playbackTrackId },
        updatePlaybackStatus,
        updatePlaybackInfo,
        addToListened,
      } = this.props

      const trackId = get(track, 'id')

      if (isPlaying) {
        if (!trackId || playbackTrackId === trackId) {
          return this.pauseTrackAsync()
        }
        await updatePlaybackStatus({ isTrackLoaded: false, isPlaying: false, isTrackEnded: false })
        await updatePlaybackInfo({ ...track })
        await addToListened(track)
        await this.playTrack(trackId)
      }
      if (trackId === playbackTrackId && !isTrackEnded) {
        return this.resumeTrack(trackId)
      }
      if (!trackId && playbackTrackId && !isTrackEnded) {
        return this.resumeTrack(playbackTrackId)
      }
      // if !trackId && !playbackTrackId && !isPlaying
      await updatePlaybackStatus({ isTrackLoaded: false, isPlaying: false, isTrackEnded: false })
      await updatePlaybackInfo({ ...track })
      await addToListened(track)
      return this.playTrack(trackId || playbackTrackId)
    }

    pauseTrackAsync = async () => {
      const {
        player: { instance },
        updatePlaybackStatus,
      } = this.props
      instance.pause()
      await updatePlaybackStatus({ isPlaying: false })
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

    nextTrackAsync = async () => {
      const {
        playbackStatus: { isShuffle },
        playbackList: { tracks },
        updatePlaybackStatus,
        updatePlaybackPosition,
      } = this.props
      const nextTrackIndex = isShuffle ? this.getRandomTrackIndex() : this.getNextTrackIndex()
      const nextTrackId = tracks[nextTrackIndex]
      await updatePlaybackStatus({ isPlaying: false, isTrackEnded: true })
      await updatePlaybackPosition({ position: 0 })
      this.advPlayTrackAsync(nextTrackId)
    }

    previousTrack = () => {
      const {
        playbackList: { tracks },
        playbackStatus: { isShuffle, isRepeat },
      } = this.props
      const previousTrackIndex = this.getPreviousTrackIndex()
      const previousTrackId = tracks[previousTrackIndex]
      this.advPlayTrackAsync(previousTrackId)
    }

    getNextTrackId = async () => {
      const {
        playbackList: { tracks, listened },
        playbackInfo: { id: playbackId },
        playbackStatus: { isShuffle, isRepeat },
        updatePlaybackStatus,
        updatePlaybackPosition,
      } = this.props

      if (!isRepeat && !isShuffle) {
        const tracksCount = tracks.length
        const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
        const nextTrackIndex = currentTrackIndex + 1
        await updatePlaybackStatus({ isPlaying: false, isTrackEnded: true })
        await updatePlaybackPosition({ position: 0 })
        if (tracksCount !== nextTrackIndex) {
          this.advPlayTrackAsync(tracks[nextTrackIndex])
        }
      }

      if (isRepeat) {
        if (isShuffle) {
          const nextTrackId = this.getRandomTrackIndex()
          return this.advPlayTrackAsync(tracks[nextTrackId])
        }
      }
    }

    getNextTrackIndex = () => {
      const {
        playbackList: { tracks, listened },
        playbackInfo: { id: playbackId },
        playbackStatus: { isShuffle, isRepeat },
      } = this.props

      // let tracks = []
      // if (!isRepeat) {
      //   tracks = differenceBy(rawTracks, listened, 'id')
      // }

      // if (!isShuffle) {
      //   const tracksCount = tracks.length
      //   const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
      //   if (tracksCount === currentTrackIndex + 1) {
      //     return 0
      //   }
      //   return currentTrackIndex + 1
      // }
      // if (isShuffle) {
      //   const randomIndex = random(0, tracks.length - 1)
      //   return randomIndex
      // }

      const tracksCount = tracks.length
      const currentTrackIndex = tracks.findIndex(track => track.id === playbackId)
      if (tracksCount === currentTrackIndex + 1) {
        return 0
      }
      return currentTrackIndex + 1
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
          playTrack={this.playTrack}
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
    updatePlaybackPosition: bindActionCreators(
      PlaybackPositionModule.updatePlaybackPosition,
      dispatch
    ),
  })

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(WithPlayerHOC)
}

export default withPlayer
