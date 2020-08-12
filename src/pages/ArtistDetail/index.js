import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import get from 'lodash/get'

import * as ArtistsModule from 'modules/artists'

import { Row, Image, Text, DangerHtml } from '../../components'
import CardsGrid from '../../containers/CardsGrid'
import TracksGrid from '../../containers/TracksGrid'
import { CARD_TYPE_ARTIST, CARD_TYPE_ALBUM } from '../../constants'

const artistTopAlbumsStorageId = 'artistAlbumsStorageId'
const artistTopTracksStorageId = 'artistTopTracksStorageId'

const ArtistDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const artistDetail = useSelector(ArtistsModule.getArtistDetailSelector)
  const getArtistDetail = useCallback(
    artistId => dispatch(ArtistsModule.getArtistDetail(artistId)),
    [dispatch]
  )
  const getTopArtistAlbums = useCallback(
    artistId => dispatch(ArtistsModule.getTopArtistAlbums(artistId)),
    [dispatch]
  )

  const getTopArtistTracks = useCallback(
    artistId => dispatch(ArtistsModule.getTopArtistTracks(artistId)),
    [dispatch]
  )

  const handleAlbumClick = useCallback(albumId => {
    history.push(`/albums/${albumId}/tracks`)
  }, [])

  const name = get(artistDetail, 'name')
  const bio = get(artistDetail, 'bios[0].bio')

  useEffect(() => {
    getArtistDetail({ data: id })
  }, [])

  return (
    <div>
      <Row className="ta-center mb-2">
        <Image
          cardSize="fullscreen"
          imageRatio={1}
          napsterImageId={id}
          type={CARD_TYPE_ARTIST}
          napsterImageSize="l"
        />
      </Row>
      <Text>
        <DangerHtml html={bio} />
      </Text>
      <CardsGrid
        disableAutoLoad
        cardType={CARD_TYPE_ALBUM}
        requestData={id}
        requestAction={getTopArtistAlbums}
        storageId={`${artistTopAlbumsStorageId}:${id}`}
        requestParams={{ limit: 50 }}
        onCardClick={handleAlbumClick}
      />
      <TracksGrid
        disableAutoLoad
        getTracksAction={getTopArtistTracks}
        requestData={id}
        storageId={`${artistTopTracksStorageId}:${id}`}
      />
    </div>
  )
}

ArtistDetail.propTypes = {}

export default ArtistDetail
