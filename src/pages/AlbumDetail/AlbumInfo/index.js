import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import get from 'lodash/get'

import { CARD_TYPES } from '../../../constants'
import { Cover } from '../../../components'
import * as AlbumsModule from '../../../modules/albums'

const AlbumInfo = () => {
  const { id: albumId } = useParams()
  const dispatch = useDispatch()
  const albumDetail = useSelector(AlbumsModule.getAlbumDetailSelector)
  const getAlbumDetail = useCallback((id) => dispatch(AlbumsModule.getAlbumDetail(id)), [dispatch])

  const albumName = get(albumDetail, 'name')
  const artistName = get(albumDetail, 'artistName')

  useEffect(() => {
    getAlbumDetail({ data: albumId })
  }, [getAlbumDetail, albumId])

  return (
    <div>
      <Cover
        napsterImageId={albumId}
        napsterImageType={CARD_TYPES.ALBUM}
        napsterImageSize="l"
        title={albumName}
        subtitle={artistName}
      />
    </div>
  )
}

AlbumInfo.propTypes = {}

export default AlbumInfo
