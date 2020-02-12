import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import get from 'lodash/get'
import differenceBy from 'lodash/differenceBy'

import * as TracksModule from 'modules/tracks'
import * as PlaybackListModule from 'modules/playbackList'

import TrackRow from '../../containers/TrackRow'

class Trending extends Component {
  async componentDidMount() {
    const { getTopTracks } = this.props
    await getTopTracks({ params: { limit: 10 } })
    // await getTopTracks({ params: { offset: 201, limit: 200 } })
    // await getTopTracks({ params: { offset: 401, limit: 200 } })
    // await getTopTracks({ params: { offset: 601, limit: 200 } })
    // await getTopTracks({ params: { offset: 801, limit: 200 } })
  }

  componentDidUpdate(prevProps) {
    const {
      topTracks: { data: prevData },
    } = prevProps
    const {
      topTracks: { data },
      setPlaybackList,
    } = this.props
    const prevTopTracksData = get(prevData, 'tracks', [])
    const topTracksData = get(data, 'tracks', [])
    if (
      prevTopTracksData.length !== topTracksData.length ||
      differenceBy(prevTopTracksData, topTracksData, 'id').length > 0
    ) {
      setPlaybackList(topTracksData)
    }
  }

  handleAddNewTracks = () => {
    const { getTopTracks } = this.props
    getTopTracks({ params: { offset: 4, limit: 5 } })
  }

  render() {
    const {
      playbackList: { tracks },
    } = this.props
    return (
      <div>
        <button type="button" onClick={this.handleAddNewTracks}>
          Add new tracks
        </button>
        {tracks.map(track => {
          return <TrackRow key={track.id} track={track} />
        })}
      </div>
    )
  }
}

Trending.propTypes = {
  topTracks: PropTypes.object.isRequired,
  playbackList: PropTypes.object.isRequired,
  getTopTracks: PropTypes.func.isRequired,
  setPlaybackList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ topTracks, playbackList }) => ({
  topTracks,
  playbackList,
})

const mapDispatchToProps = dispatch => ({
  getTopTracks: bindActionCreators(TracksModule.getTopTracks, dispatch),
  setPlaybackList: bindActionCreators(PlaybackListModule.setPlaybackList, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Trending)
