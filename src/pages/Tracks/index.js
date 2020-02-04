import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'
import { FaBeer } from 'react-icons/fa'

import { Button } from 'components'

import * as TracksModule from 'modules/tracks'

import { getCurrentApi } from 'helpers'

const { clientId, apiName } = getCurrentApi()

const { Napster } = window

class Tracks extends Component {
  componentDidMount() {
    console.log('Tracks')
    const { getTopTracks } = this.props

    getTopTracks()
  }

  playTrack = trackId => {
    Napster.player.play(trackId)
  }

  stopTrack = () => {
    Napster.player.pause()
  }

  render() {
    const { topTracks } = this.props
    // console.log(axiosInstance.defaults)
    const topTracksData = get(topTracks, 'data.tracks', [])
    return (
      <div>
        {topTracksData.map(track => {
          return (
            <div key={track.id} onClick={() => this.playTrack(track.id)}>
              {track.name}
            </div>
          )
        })}
        <FaBeer size="30px" color="red" />
        <Button onClick={this.playTrack}>Play</Button>
        <Button variant="secondary" onClick={this.stopTrack}>Stop</Button>
      </div>
    )
  }
}

Tracks.propTypes = {
  topTracks: PropTypes.object.isRequired,
  getTopTracks: PropTypes.func.isRequired,
}

const mapStateToProps = ({ topTracks }) => ({
  topTracks,
})

const mapDispatchToProps = dispatch => ({
  getTopTracks: bindActionCreators(TracksModule.getTopTracks, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(Tracks)