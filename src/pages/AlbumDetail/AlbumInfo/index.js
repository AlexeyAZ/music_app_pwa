import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import get from 'lodash/get'

import { CARD_TYPE_ALBUM } from '../../../constants'
import { Row, Image, Text } from '../../../components'
import * as AlbumsModule from '../../../modules/albums'

const AlbumInfo = () => {
  const { id: albumId } = useParams()
  const dispatch = useDispatch()
  const albumDetail = useSelector(AlbumsModule.getAlbumDetailSelector)
  const getAlbumDetail = useCallback(id => dispatch(AlbumsModule.getAlbumDetail(id)), [dispatch])

  console.log(albumDetail)

  const albumName = get(albumDetail, 'name')
  const artistName = get(albumDetail, 'artistName')

  useEffect(() => {
    getAlbumDetail({ data: albumId })
  }, [])

  return (
    <div>
      <Row className="ta-center mb-2">
        <Image
          cardSize="fullscreen"
          imageRatio={1}
          napsterImageId={albumId}
          type={CARD_TYPE_ALBUM}
          napsterImageSize="l"
        />
      </Row>
      <Text>{albumName}</Text>
      <Text>{artistName}</Text>
    </div>
  )
}

AlbumInfo.propTypes = {}

export default AlbumInfo
