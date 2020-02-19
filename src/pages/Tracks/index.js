import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import { getTracks } from 'helpers'

import * as GridModule from 'modules/grid'
import * as TracksModule from 'modules/tracks'

import { ArtistCard, Text } from 'components'

import TrackRow from '../../containers/TrackRow'
import BaseGrid from '../../containers/BaseGrid'

const playbackListId = 'id1'

// eslint-disable-next-line react/prefer-stateless-function
class Tracks extends Component {
  getTopArtists = async params => {
    const { getTopTracks, addItemsToGrid } = this.props

    const newTracks = await getTracks(getTopTracks, 'data.tracks', params, playbackListId)
    addItemsToGrid(newTracks)
  }

  render() {
    console.log('render Tracks')
    const {
      gridItems: { data: gridItemsData },
      topTracks: { loading },
    } = this.props
    return (
      <div>
        <Text>Top artists</Text>
        <BaseGrid isLoading={loading} customAction={this.getTopArtists}>
          {gridItemsData.map(track => {
            return <TrackRow track={track} key={track.id} />
          })}
        </BaseGrid>
      </div>
    )
  }
}

Tracks.propTypes = {
  gridItems: PropTypes.object.isRequired,
  topTracks: PropTypes.object.isRequired,
  addItemsToGrid: PropTypes.func.isRequired,
  getTopTracks: PropTypes.func.isRequired,
}

const mapStateToProps = ({ gridItems, topTracks }) => ({
  gridItems,
  topTracks,
})

const mapDispatchToProps = dispatch => ({
  addItemsToGrid: bindActionCreators(GridModule.addItemsToGrid, dispatch),
  getTopTracks: bindActionCreators(TracksModule.getTopTracks, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks)
