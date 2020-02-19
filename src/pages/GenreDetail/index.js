import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import * as GenresModule from 'modules/genres'

import { getNapsterImage } from 'helpers'
import { ArtistCard, AlbumCard, Text, Title, DangerHtml } from 'components'
import { HeaderTitle } from 'portals'

import styles from './styles.module.scss'

class GenreDetail extends Component {
  componentDidMount() {
    const {
      getTopArtistsByGenre,
      getGenreDetail,
      getTopAlbumsByGenre,
      match: {
        params: { id },
      },
    } = this.props
    const limit = 30
    getTopAlbumsByGenre({ data: id, params: { limit } })
    getTopArtistsByGenre({ data: id, params: { limit } })
    getGenreDetail({ data: id })
  }

  render() {
    const { topArtistsByGenre, genreDetail, topAlbumsByGenre } = this.props
    const topArtistsData = get(topArtistsByGenre, 'data.artists', [])
    const topAlbumsData = get(topAlbumsByGenre, 'data.albums', [])
    const genreDetailData = get(genreDetail, 'data.genres[0]', {})
    const imgSrc = getNapsterImage({ type: 'genre', id: genreDetailData.id })
    return (
      <div>
        <HeaderTitle>{genreDetailData.name}</HeaderTitle>
        <div className={styles.imageWrap}>
          {imgSrc && <img src={imgSrc} className={styles.image} alt="" />}
          <Title className={styles.imageTitle} color="white" size="xxl">
            {genreDetailData.name}
          </Title>
        </div>
        <Text mb="4">
          <DangerHtml html={genreDetailData.description} />
        </Text>
        <div className={styles.section}>
          <Title size="m" className={styles.sectionTitle}>
            Top artists by genre
          </Title>
          <div className={styles.wrap}>
            {topArtistsData.map(({ id, name }) => {
              return <ArtistCard id={id} key={id} name={name} />
            })}
          </div>
        </div>
        <Title size="m" mb="4">
          Top albums by genre
        </Title>
        <div className={styles.wrap}>
          {topAlbumsData.map(({ id, name, artistName }) => {
            return <AlbumCard id={id} key={id} albumName={name} artistName={artistName} />
          })}
        </div>
      </div>
    )
  }
}

GenreDetail.propTypes = {
  match: PropTypes.object.isRequired,
  topArtistsByGenre: PropTypes.object.isRequired,
  genreDetail: PropTypes.object.isRequired,
  getTopArtistsByGenre: PropTypes.func.isRequired,
  topAlbumsByGenre: PropTypes.object.isRequired,
  getGenreDetail: PropTypes.func.isRequired,
  getTopAlbumsByGenre: PropTypes.func.isRequired,
}

const mapStateToProps = ({ topArtistsByGenre, genreDetail, topAlbumsByGenre }) => ({
  topArtistsByGenre,
  genreDetail,
  topAlbumsByGenre,
})

const mapDispatchToProps = dispatch => ({
  getTopArtistsByGenre: bindActionCreators(GenresModule.getTopArtistsByGenre, dispatch),
  getGenreDetail: bindActionCreators(GenresModule.getGenreDetail, dispatch),
  getTopAlbumsByGenre: bindActionCreators(GenresModule.getTopAlbumsByGenre, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(GenreDetail)
