import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'

import { napsterConfig } from 'config'

import * as PlayerModule from 'modules/player'
import * as PlaybackStatusModule from 'modules/playbackStatus'
import * as PlaybackPositionModule from 'modules/playbackPosition'

import { store } from '../store'

const { DrmStreamingPlayer } = window

const withPlayer = WrappedComponent => {
  class WithPlayerHOC extends Component {
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

      player.callbackHandler('trackEnded', () => {
        console.log('WithPlayerHOC -> trackEnded')
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
        const trackId = get(meta, 'track.id', '')
        const duration = get(meta, 'track.duration')
        updatePlaybackStatus({
          duration,
          isPlaying: true,
          trackId: this.getRealTrackId(trackId),
          isTrackLoaded: true,
        })
      })
      player.callbackHandler('error', е => {
        console.log(`WithPlayerHOC -> error ->`, е)
        const code = get(е, 'error.code')
        console.log(code)
        // const e = {
        //   error: {
        //     code:
        //       "Error: {"status":500,"statusText":"Internal Server Error","url":"https://api.napster.com/v2.2/streams?bitrate=192&drm=widevine&format=AAC&protocol=mpd&track=Tra.404757770","bodyMessage":"Internal Server Error"}",
        //     message: '',
        //     name: '',
        //   },
        // }

        // code: "Playback session expired by another client"
        // code: "The track format does not exist."
      })
      player.callbackHandler('sessionError', е => {
        console.log(`WithPlayerHOC -> sessionError ->`, е)
      })
      player.callbackHandler('sessionExpired', e => {
        console.log(`WithPlayerHOC -> sessionExpired ->`, e)
        // code: "Playback session expired by another client"
      })
      player.callbackHandler('trackError', е => {
        console.log(`WithPlayerHOC -> trackError ->`, е)
      })
      await setPlayerInstance(player)
      console.log('withPlayer:', player)
    }

    parseError = error => {
      const code = get(error, 'error.code')
      const rawCode = `{${code.split('{')[1].split('}')[0]}}`
      console.log(rawCode)
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

    playTrack = trackId => {
      const {
        player: { instance },
      } = this.props
      instance.play(this.getPlayerTrackId(trackId), this.getPlayerContext())
    }

    advPlayTrack = trackId => {
      const {
        playbackStatus: { trackId: playbackTrackId, isPlaying },
        updatePlaybackStatus,
      } = this.props
      if (isPlaying) {
        if (!trackId || playbackTrackId === trackId) {
          return this.pauseTrack()
        }
        updatePlaybackStatus({ trackId, isTrackLoaded: false, isPlaying: false })
        return this.playTrack(trackId)
      }
      if (playbackTrackId === trackId) {
        return this.resumeTrack(trackId)
      }
      if (playbackTrackId && !trackId) {
        return this.resumeTrack(playbackTrackId)
      }
      updatePlaybackStatus({ trackId, isTrackLoaded: false })
      return this.playTrack(trackId)
    }

    pauseTrack = () => {
      const {
        player: { instance },
        updatePlaybackStatus,
      } = this.props
      instance.pause()
      updatePlaybackStatus({ isPlaying: false })
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
          advPlayTrack={this.advPlayTrack}
          pauseTrack={this.pauseTrack}
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
    children: PropTypes.any,
    authOptions: PropTypes.object.isRequired,
    setPlayerInstance: PropTypes.func.isRequired,
    updatePlaybackStatus: PropTypes.func.isRequired,
    updatePlaybackPosition: PropTypes.func.isRequired,
  }
  WithPlayerHOC.defaultProps = {
    children: null,
  }

  const mapStateToProps = ({ authOptions, player, playbackStatus }) => ({
    authOptions,
    player,
    playbackStatus,
  })

  const mapDispatchToProps = dispatch => ({
    setPlayerInstance: bindActionCreators(PlayerModule.setPlayerInstance, dispatch),
    updatePlaybackStatus: bindActionCreators(PlaybackStatusModule.updatePlaybackStatus, dispatch),
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
