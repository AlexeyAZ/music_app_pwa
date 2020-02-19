import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import { getTracks } from 'helpers'

import {
  ScrollContainer,
  StationCard,
  GenreCard,
  PlaysistCard,
  ArtistCard,
  AlbumCard,
  Container,
  Row,
} from 'components'

import * as GenresModule from 'modules/genres'
import * as StationsModule from 'modules/stations'
import * as PlaylistsModule from 'modules/playlists'
import * as ArtistsModule from 'modules/artists'
import * as AlbumsModule from 'modules/albums'
import * as TacksModule from 'modules/tracks'

import TrackRow from '../../containers/TrackRow'

import styles from './styles.module.scss'

const playbackListId = 'id3'

class Trending extends Component {
  async componentDidMount() {
    const {
      getTopStations,
      getAllGenres,
      getTopPlaylists,
      getTopArtists,
      getTopAlbums,
      getTopTracks,
    } = this.props
    getTracks(getTopTracks, 'data.tracks', { limit: 10 }, playbackListId)
    getTopAlbums()
    getTopArtists()
    getAllGenres()
    getTopPlaylists()
    getTopStations()
  }

  handleGenreClick = genreId => {
    const { history } = this.props
    history.push(`/genres/${genreId}`)
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
    const { topStations, allGenres, topPlaylists, topArtists, topAlbums, topTracks } = this.props
    const tracks = get(topTracks, 'data.tracks', [])

    return (
      <div>
        <Row>
          <ScrollContainer>
            <Container>
              <div className={styles.genres}>
                {get(topStations, 'data.stations', []).map(station => (
                  <StationCard key={station.id} name={station.name} id={station.id} />
                ))}
              </div>
            </Container>
          </ScrollContainer>
          <ScrollContainer>
            <Container>
              <div className={styles.genres}>
                {get(allGenres, 'data.genres', []).map(genre => (
                  <GenreCard
                    onClick={() => this.handleGenreClick(genre.id)}
                    key={genre.id}
                    name={genre.name}
                    id={genre.id}
                  />
                ))}
              </div>
            </Container>
          </ScrollContainer>
          <ScrollContainer>
            <Container>
              <div className={styles.genres}>
                {get(topPlaylists, 'data.playlists', []).map(playlist => (
                  <PlaysistCard key={playlist.id} name={playlist.name} id={playlist.id} />
                ))}
              </div>
            </Container>
          </ScrollContainer>
          <ScrollContainer>
            <Container>
              <div className={styles.artists}>
                {get(topArtists, 'data.artists', []).map(artist => (
                  <ArtistCard
                    key={artist.id}
                    name={artist.name}
                    id={artist.id}
                    onClick={this.handleArtistClick}
                  />
                ))}
              </div>
            </Container>
          </ScrollContainer>
          <ScrollContainer>
            <Container>
              <div className={styles.albums}>
                {get(topAlbums, 'data.albums', []).map(album => (
                  <AlbumCard
                    key={album.id}
                    albumName={album.name}
                    artistName={album.artistName}
                    id={album.id}
                    onClick={this.handleTrackClick}
                  />
                ))}
              </div>
            </Container>
          </ScrollContainer>
        </Row>

        {tracks.map(track => {
          return <TrackRow key={track.id} track={track} />
        })}
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
  topAlbums: PropTypes.object.isRequired,
  topTracks: PropTypes.object.isRequired,
  getTopStations: PropTypes.func.isRequired,
  getAllGenres: PropTypes.func.isRequired,
  getTopPlaylists: PropTypes.func.isRequired,
  getTopArtists: PropTypes.func.isRequired,
  getTopAlbums: PropTypes.func.isRequired,
  getTopTracks: PropTypes.func.isRequired,
}

const mapStateToProps = ({
  topStations,
  allGenres,
  topPlaylists,
  topArtists,
  topAlbums,
  topTracks,
}) => ({
  topStations,
  allGenres,
  topPlaylists,
  topArtists,
  topAlbums,
  topTracks,
})

const mapDispatchToProps = dispatch => ({
  getTopStations: bindActionCreators(StationsModule.getTopStations, dispatch),
  getAllGenres: bindActionCreators(GenresModule.getAllGenres, dispatch),
  getTopPlaylists: bindActionCreators(PlaylistsModule.getTopPlaylists, dispatch),
  getTopArtists: bindActionCreators(ArtistsModule.getTopArtists, dispatch),
  getTopAlbums: bindActionCreators(AlbumsModule.getTopAlbums, dispatch),
  getTopTracks: bindActionCreators(TacksModule.getTopTracks, dispatch),
  getAlbumImages: bindActionCreators(AlbumsModule.getAlbumImages, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Trending)
