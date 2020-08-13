import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import * as AlbumsModule from '../../../modules/albums'

import { TracksGrid } from '../../../containers'

const albumTracksStorageId = 'artistTopTracksStorageId'

const AlbumTracks = () => {
  const { id: albumId } = useParams()
  const dispatch = useDispatch()
  const getAlbumTracks = useCallback((id) => dispatch(AlbumsModule.getAlbumTracks(id)), [dispatch])
  return (
    <div>
      <TracksGrid
        disableAutoLoad
        getTracksAction={getAlbumTracks}
        requestData={albumId}
        storageId={`${albumTracksStorageId}:${albumId}`}
      />
    </div>
  )
}

AlbumTracks.propTypes = {}

export default AlbumTracks
