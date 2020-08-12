import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router'

import * as AlbumsModule from 'modules/albums'

import { CardsGrid } from '../../../containers'

import { CARD_TYPE_ALBUM } from '../../../constants'

const SIMILAR_ALBUMS_STORAGE_ID = 'similarAlbumsStorageId'

const SimilarAlbums = () => {
  const { id: albumId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const getSimilarAlbums = useCallback(id => dispatch(AlbumsModule.getSimilarAlbums(id)), [
    dispatch,
  ])

  const handleAlbumClick = id => {
    history.push(`/albums/${id}/tracks`)
  }

  return (
    <CardsGrid
      cardType={CARD_TYPE_ALBUM}
      requestAction={getSimilarAlbums}
      requestData={albumId}
      storageId={`${SIMILAR_ALBUMS_STORAGE_ID}:${albumId}`}
      onCardClick={handleAlbumClick}
    />
  )
}

SimilarAlbums.propTypes = {}

export default SimilarAlbums
