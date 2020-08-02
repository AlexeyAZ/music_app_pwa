import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import {
  CommonCard,
  ScrollContainer,
  StationCard,
  GenreCard,
  PlaysistCard,
  ArtistCard,
  AlbumCard,
  Grid,
  Container,
  Row,
  Title,
} from 'components'

import * as GenresModule from 'modules/genres'
import * as StationsModule from 'modules/stations'
import * as PlaylistsModule from 'modules/playlists'
import * as ArtistsModule from 'modules/artists'
import * as AlbumsModule from 'modules/albums'
import * as TacksModule from 'modules/tracks'
import * as TempStorageModule from 'modules/tempStorage'

import TracksGrid from '../../containers/TracksGrid'
import AutoLoadContainer from '../../containers/AutoLoadContainer'

import styles from './styles.module.scss'

const albumsStorageId = 'trendingAlbums'

class Trending extends Component {
  async componentDidMount() {
    const {
      getTopStations,
      getAllGenres,
      getTopPlaylists,
      getTopArtists,
      clearTempStorage,
    } = this.props
    await clearTempStorage(albumsStorageId)
    getTopArtists()
    getAllGenres()
    getTopPlaylists()
    getTopStations()
  }

  handleGenreClick = genreId => {
    const { history } = this.props
    history.push(`/genres/${genreId}`)
  }

  handleAlbumClick = id => {
    const { history } = this.props
    history.push(`/album/${id}`)
  }

  handleArtistClick = () => {
    const { history } = this.props
    history.push(`/artists/`)
  }

  handleTrackClick = () => {
    const { history } = this.props
    history.push(`/tracks/`)
  }

  render() {
    const {
      getTopTracks,
      topStations,
      allGenres,
      topPlaylists,
      topArtists,
      getTopAlbums,
      tempStorage,
    } = this.props

    const albumTempStorageItems = get(
      tempStorage.data.find(item => item.id === albumsStorageId),
      'items',
      []
    )

    return (
      <div>
        <Row>
          <Container>
            <Title mb={2}>Top albums</Title>
          </Container>
          <AutoLoadContainer
            type="horizontal"
            entityAction={getTopAlbums}
            entityDataPatch="data.albums"
            storageId={albumsStorageId}
            customParams={{ limit: 10 }}
          >
            <Container>
              <Grid direction="horizontal">
                {albumTempStorageItems.map(album => (
                  <CommonCard
                    imageRatio={0.8}
                    imageType="album"
                    key={album.id}
                    title={album.name}
                    subtitle={album.artistName}
                    id={album.id}
                    onClick={() => this.handleAlbumClick(album.id)}
                  />
                ))}
              </Grid>
            </Container>
          </AutoLoadContainer>

          <Container>
            <Title mb={2}>Top stations</Title>
          </Container>
          <ScrollContainer>
            <Container>
              <Grid direction="horizontal">
                {get(topStations, 'data.stations', []).map(station => (
                  <CommonCard
                    imageType="station"
                    key={station.id}
                    title={station.name}
                    id={station.id}
                  />
                ))}
              </Grid>
            </Container>
          </ScrollContainer>

          <Container>
            <Title mb={2}>Genres</Title>
          </Container>
          <ScrollContainer>
            <Container>
              <Grid direction="horizontal">
                {get(allGenres, 'data.genres', []).map(genre => (
                  <CommonCard
                    borderRadius="l"
                    imageType="genre"
                    onClick={() => this.handleGenreClick(genre.id)}
                    key={genre.id}
                    title={genre.name}
                    id={genre.id}
                  />
                ))}
              </Grid>
            </Container>
          </ScrollContainer>

          <Container>
            <Title mb={2}>Top playlists</Title>
          </Container>
          <ScrollContainer>
            <Container>
              <Grid direction="horizontal">
                {get(topPlaylists, 'data.playlists', []).map(playlist => (
                  <CommonCard
                    borderRadius="s"
                    imageType="playlist"
                    key={playlist.id}
                    title={playlist.name}
                    id={playlist.id}
                  />
                ))}
              </Grid>
            </Container>
          </ScrollContainer>

          <Container>
            <Title mb={2}>Top artists</Title>
          </Container>
          <ScrollContainer>
            <Container>
              <Grid direction="horizontal">
                {get(topArtists, 'data.artists', []).map(artist => (
                  <CommonCard
                    borderRadius="round"
                    imageType="artist"
                    key={artist.id}
                    title={artist.name}
                    id={artist.id}
                    onClick={this.handleArtistClick}
                  />
                ))}
              </Grid>
            </Container>
          </ScrollContainer>
        </Row>

        <Title mb={2}>Top tracks</Title>
        <TracksGrid
          disableAutoload
          getTracksAction={getTopTracks}
          storageId="trending"
          dataPath="data.tracks"
        />
      </div>
    )
  }
}

Trending.propTypes = {
  history: PropTypes.object.isRequired,
  topStations: PropTypes.object.isRequired,
  allGenres: PropTypes.object.isRequired,
  topPlaylists: PropTypes.object.isRequired,
  topArtists: PropTypes.object.isRequired,
  tempStorage: PropTypes.object.isRequired,
  getTopStations: PropTypes.func.isRequired,
  getAllGenres: PropTypes.func.isRequired,
  getTopPlaylists: PropTypes.func.isRequired,
  getTopArtists: PropTypes.func.isRequired,
  getTopAlbums: PropTypes.func.isRequired,
  getTopTracks: PropTypes.func.isRequired,
  clearTempStorage: PropTypes.func.isRequired,
}

const mapStateToProps = ({
  topStations,
  allGenres,
  topPlaylists,
  topArtists,
  topAlbums,
  tempStorage,
}) => ({
  topStations,
  allGenres,
  topPlaylists,
  topArtists,
  topAlbums,
  tempStorage,
})

const mapDispatchToProps = dispatch => ({
  getTopStations: bindActionCreators(StationsModule.getTopStations, dispatch),
  getAllGenres: bindActionCreators(GenresModule.getAllGenres, dispatch),
  getTopPlaylists: bindActionCreators(PlaylistsModule.getTopPlaylists, dispatch),
  getTopArtists: bindActionCreators(ArtistsModule.getTopArtists, dispatch),
  getTopAlbums: bindActionCreators(AlbumsModule.getTopAlbums, dispatch),
  getTopTracks: bindActionCreators(TacksModule.getTopTracks, dispatch),
  getAlbumImages: bindActionCreators(AlbumsModule.getAlbumImages, dispatch),
  clearTempStorage: bindActionCreators(TempStorageModule.clearTempStorage, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Trending)
