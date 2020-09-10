import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import get from 'lodash/get'

import * as GenresModule from '../../modules/genres'

import { Poster, Row, Text, Title, DangerHtml } from '../../components'
import { HeaderTitle } from '../../portals'

import TracksGrid from '../../containers/TracksGrid'
import CardsGrid from '../../containers/CardsGrid'

import { CARD_TYPES } from '../../constants'

import styles from './styles.module.scss'

const genreTopArtistsStorageId = 'genreTopArtistsStorageId'
const genreTopAlbumsStorageId = 'genreTopAlbumsStorageId'
const genreTopTracksStorageId = 'genreTopTracksStorageId'

const limit = 30

const GenreDetail = () => {
  const { id: genreId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const genreDetail = useSelector(GenresModule.getGenreDetailSelector)
  const getGenreDetail = useCallback((id) => dispatch(GenresModule.getGenreDetail(id)), [dispatch])

  const getTopAlbumsByGenre = useCallback((id) => dispatch(GenresModule.getTopAlbumsByGenre(id)), [
    dispatch,
  ])

  const getTopArtistsByGenre = useCallback(
    (id) => dispatch(GenresModule.getTopArtistsByGenre(id)),
    [dispatch]
  )

  const getTopTracksByGenre = useCallback((id) => dispatch(GenresModule.getTopTracksByGenre(id)), [
    dispatch,
  ])

  const genreName = get(genreDetail, 'name')
  const genreDescription = get(genreDetail, 'description')

  const handleArtistClick = useCallback(
    (id) => {
      history.push(`/artists/${id}`)
    },
    [history]
  )

  const handleAlbumClick = useCallback(
    (id) => {
      history.push(`/albums/${id}`)
    },
    [history]
  )

  useEffect(() => {
    getGenreDetail({ data: genreId })
  }, [getGenreDetail, genreId])

  return (
    <div>
      <HeaderTitle>{genreName}</HeaderTitle>
      <Row>
        <Poster napsterImageId={genreId} napsterImageType={CARD_TYPES.GENRE} title={genreName} />
      </Row>
      <Text mb="4">
        <DangerHtml html={genreDescription} />
      </Text>
      <div className={styles.section}>
        <Title size="m" className={styles.sectionTitle}>
          Top artists by genre
        </Title>
        <div className={styles.wrap}>
          <CardsGrid
            disableAutoLoad
            cardType={CARD_TYPES.ARTIST}
            requestAction={getTopArtistsByGenre}
            requestData={genreId}
            storageId={`${genreTopArtistsStorageId}:${genreId}`}
            requestParams={{ limit }}
            onCardClick={handleArtistClick}
          />
        </div>
      </div>
      <div className={styles.section}>
        <Title size="m" className={styles.sectionTitle}>
          Top albums by genre
        </Title>
        <div className={styles.wrap}>
          <CardsGrid
            disableAutoLoad
            cardType={CARD_TYPES.ALBUM}
            requestAction={getTopAlbumsByGenre}
            requestData={genreId}
            storageId={`${genreTopAlbumsStorageId}:${genreId}`}
            requestParams={{ limit }}
            onCardClick={handleAlbumClick}
          />
        </div>
      </div>
      <div className={styles.section}>
        <Title size="m" className={styles.sectionTitle}>
          Top tracks by genre
        </Title>
        <div className={styles.wrap}>
          <TracksGrid
            disableAutoLoad
            storageId={`${genreTopTracksStorageId}:${genreId}`}
            requestData={genreId}
            getTracksAction={getTopTracksByGenre}
          />
        </div>
      </div>
    </div>
  )
}

GenreDetail.propTypes = {}

export default GenreDetail
