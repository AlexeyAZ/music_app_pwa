import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import get from 'lodash/get'

import * as ArtistsModule from '../../modules/artists'

import { Row, Poster, Text, DangerHtml, LayoutWithNavbar } from '../../components'
import CardsGrid from '../../containers/CardsGrid'
import TracksGrid from '../../containers/TracksGrid'
import { CARD_TYPES } from '../../constants'

const ARTIST_DETAIL_TOP_ALBUMS_STORAGE_ID = 'ARTIST_DETAIL_TOP_ALBUMS_STORAGE_ID'
const ARTIST_DETAIL_TOP_TRACKS_STORAGE_ID = 'ARTIST_DETAIL_TOP_TRACKS_STORAGE_ID'
const ARTIST_DETAIL_ALBUMS_STORAGE_ID = 'ARTIST_DETAIL_ALBUMS_STORAGE_ID'
const ARTIST_DETAIL_TRACKS_STORAGE_ID = 'ARTIST_DETAIL_TRACKS_STORAGE_ID'

const ArtistDetail = () => {
  const { id: artistId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const artistDetail = useSelector(ArtistsModule.getArtistDetailSelector)
  const getArtistDetail = useCallback((id) => dispatch(ArtistsModule.getArtistDetail(id)), [
    dispatch,
  ])

  const getArtistAlbums = useCallback((id) => dispatch(ArtistsModule.getArtistAlbums(id)), [
    dispatch,
  ])

  const getTopArtistAlbums = useCallback((id) => dispatch(ArtistsModule.getTopArtistAlbums(id)), [
    dispatch,
  ])

  const getTopArtistTracks = useCallback((id) => dispatch(ArtistsModule.getTopArtistTracks(id)), [
    dispatch,
  ])

  const getArtistTracks = useCallback((id) => dispatch(ArtistsModule.getArtistTracks(id)), [
    dispatch,
  ])

  const handleAlbumClick = useCallback(
    (albumId) => {
      history.push(`/albums/${albumId}/tracks`)
    },
    [history]
  )

  const name = get(artistDetail, 'name')
  const bio = get(artistDetail, 'bios[0].bio')

  const makeNavbarData = () => [
    {
      title: 'Artist tracks',
      to: `/artists/${artistId}/tracks`,
      key: `tracks`,
      render: () => (
        <TracksGrid
          getTracksAction={getArtistTracks}
          requestData={artistId}
          storageId={`${ARTIST_DETAIL_TRACKS_STORAGE_ID}:${artistId}`}
        />
      ),
    },
    {
      title: 'Artist albums',
      to: `/artists/${artistId}/albums`,
      key: `albums`,
      render: () => (
        <CardsGrid
          cardType={CARD_TYPES.ALBUM}
          requestData={artistId}
          requestAction={getArtistAlbums}
          storageId={`${ARTIST_DETAIL_ALBUMS_STORAGE_ID}:${artistId}`}
          onCardClick={handleAlbumClick}
        />
      ),
    },
    {
      title: 'Artist info',
      to: `/artists/${artistId}/info`,
      key: `info`,
      render: () => (
        <div>
          <Row className="ta-center mb-2">
            <Poster
              napsterImageId={artistId}
              napsterImageType={CARD_TYPES.ARTIST}
              napsterImageSize="l"
              title={name}
            />
          </Row>
          <Text>
            <DangerHtml html={bio} />
          </Text>
          <CardsGrid
            disableAutoLoad
            cardType={CARD_TYPES.ALBUM}
            requestData={artistId}
            requestAction={getTopArtistAlbums}
            storageId={`${ARTIST_DETAIL_TOP_ALBUMS_STORAGE_ID}:${artistId}`}
            onCardClick={handleAlbumClick}
          />
          <TracksGrid
            disableAutoLoad
            getTracksAction={getTopArtistTracks}
            requestData={artistId}
            storageId={`${ARTIST_DETAIL_TOP_TRACKS_STORAGE_ID}:${artistId}`}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getArtistDetail({ data: artistId })
  }, [getArtistDetail, artistId])

  const navbarData = makeNavbarData()

  return (
    <LayoutWithNavbar data={navbarData} splitLocationValue={3} />
    // <div>
    //   <Row className="ta-center mb-2">
    //     <Poster
    //       napsterImageId={id}
    //       napsterImageType={CARD_TYPES.ARTIST}
    //       napsterImageSize="l"
    //       title={name}
    //     />
    //   </Row>
    //   <Text>
    //     <DangerHtml html={bio} />
    //   </Text>
    //   <CardsGrid
    //     disableAutoLoad
    //     cardType={CARD_TYPES.ALBUM}
    //     requestData={id}
    //     requestAction={getTopArtistAlbums}
    //     storageId={`${artistTopAlbumsStorageId}:${id}`}
    //     requestParams={{ limit: 50 }}
    //     onCardClick={handleAlbumClick}
    //   />
    //   <TracksGrid
    //     disableAutoLoad
    //     getTracksAction={getTopArtistTracks}
    //     requestData={id}
    //     storageId={`${artistTopTracksStorageId}:${id}`}
    //   />
    // </div>
  )
}

ArtistDetail.propTypes = {}

export default ArtistDetail
