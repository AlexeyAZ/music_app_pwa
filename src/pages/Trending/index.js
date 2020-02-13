import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import { getTracks } from 'helpers'

import * as TacksModule from 'modules/tracks'

import TrackRow from '../../containers/TrackRow'

class Trending extends Component {
  async componentDidMount() {
    const { getTopTracks } = this.props
    getTracks(getTopTracks, 'data.tracks', { limit: 30 })
  }

  render() {
    const { topTracks } = this.props
    const tracks = get(topTracks, 'data.tracks', [])
    return (
      <div>
        {tracks.map(track => {
          return <TrackRow key={track.id} track={track} />
        })}
      </div>
    )
  }
}

Trending.propTypes = {
  topTracks: PropTypes.object.isRequired,
  getTopTracks: PropTypes.func.isRequired,
}

const mapStateToProps = ({ topTracks }) => ({
  topTracks,
})

const mapDispatchToProps = dispatch => ({
  getTopTracks: bindActionCreators(TacksModule.getTopTracks, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Trending)
