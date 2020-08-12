import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'

import { Container, Row, Title } from 'components'

import * as GenresModule from 'modules/genres'
import * as StationsModule from 'modules/stations'
import * as PlaylistsModule from 'modules/playlists'
import * as ArtistsModule from 'modules/artists'
import * as AlbumsModule from 'modules/albums'
import * as TacksModule from 'modules/tracks'

import TracksGrid from '../../containers/TracksGrid'
import CardsGrid from '../../containers/CardsGrid'

import {
  CARD_TYPE_ARTIST,
  CARD_TYPE_ALBUM,
  CARD_TYPE_PLAYLIST,
  CARD_TYPE_GENRE,
  CARD_TYPE_STATION,
} from '../../constants'

const albumsStorageId = 'trendingAlbums'
const stationsStorageId = 'trendingStations'
const genresStorageId = 'trendingGenres'
const playlistsStorageId = 'trendingPlaylists'
const artistsStorageId = 'trendingArtists'
const trendingTopTracksStorageId = 'trendingTopTracksStorageId'

class Trending extends Component {
  handleGenreClick = genreId => {
    const { history } = this.props
    history.push(`/genres/${genreId}`)
  }

  handleAlbumClick = id => {
    const { history } = this.props
    history.push(`/albums/${id}/tracks`)
  }

  handleArtistClick = artistId => {
    const { history } = this.props
    history.push(`/artists/${artistId}`)
  }

  handlePlaylistClick = playlistId => {
    const { history } = this.props
    history.push(`/playlists/${playlistId}`)
  }

  handleStationClick = stationId => {
    const { history } = this.props
    history.push(`/stations/${stationId}`)
  }

  render() {
    const {
      getTopTracks,
      getTopStations,
      getAllGenres,
      getTopPlaylists,
      getTopArtists,
      getTopAlbums,
    } = this.props

    return (
      <div>
        <Row>
          <Container>
            <Title mb={2}>Top albums</Title>
          </Container>
          <CardsGrid
            cardType={CARD_TYPE_ALBUM}
            containerScrollType="horizontal"
            gridDirection="horizontal"
            requestAction={getTopAlbums}
            storageId={albumsStorageId}
            requestParams={{ limit: 10 }}
            onCardClick={this.handleAlbumClick}
          />

          <Container>
            <Title mb={2}>Top stations</Title>
          </Container>
          <CardsGrid
            cardType={CARD_TYPE_STATION}
            containerScrollType="horizontal"
            gridDirection="horizontal"
            requestAction={getTopStations}
            storageId={stationsStorageId}
            requestParams={{ limit: 10 }}
            onCardClick={this.handleStationClick}
          />

          <Container>
            <Title mb={2}>Genres</Title>
          </Container>
          <CardsGrid
            disableAutoLoad
            cardType={CARD_TYPE_GENRE}
            containerScrollType="horizontal"
            gridDirection="horizontal"
            requestAction={getAllGenres}
            storageId={genresStorageId}
            onCardClick={this.handleGenreClick}
          />

          <Container>
            <Title mb={2}>Top playlists</Title>
          </Container>
          <CardsGrid
            cardType={CARD_TYPE_PLAYLIST}
            containerScrollType="horizontal"
            gridDirection="horizontal"
            requestAction={getTopPlaylists}
            storageId={playlistsStorageId}
            requestParams={{ limit: 20 }}
            onCardClick={this.handlePlaylistClick}
          />

          <Container>
            <Title mb={2}>Top artists</Title>
          </Container>
          <CardsGrid
            cardType={CARD_TYPE_ARTIST}
            containerScrollType="horizontal"
            gridDirection="horizontal"
            requestAction={getTopArtists}
            storageId={artistsStorageId}
            requestParams={{ limit: 20 }}
            onCardClick={this.handleArtistClick}
          />
        </Row>

        <Title mb={2}>Top tracks</Title>
        <TracksGrid getTracksAction={getTopTracks} storageId={trendingTopTracksStorageId} />
      </div>
    )
  }
}

Trending.propTypes = {
  history: PropTypes.object.isRequired,
  getTopStations: PropTypes.func.isRequired,
  getAllGenres: PropTypes.func.isRequired,
  getTopPlaylists: PropTypes.func.isRequired,
  getTopArtists: PropTypes.func.isRequired,
  getTopAlbums: PropTypes.func.isRequired,
  getTopTracks: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  getTopStations: bindActionCreators(StationsModule.getTopStations, dispatch),
  getAllGenres: bindActionCreators(GenresModule.getAllGenres, dispatch),
  getTopPlaylists: bindActionCreators(PlaylistsModule.getTopPlaylists, dispatch),
  getTopArtists: bindActionCreators(ArtistsModule.getTopArtists, dispatch),
  getTopAlbums: bindActionCreators(AlbumsModule.getTopAlbums, dispatch),
  getTopTracks: bindActionCreators(TacksModule.getTopTracks, dispatch),
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withRouter
)(Trending)
