import React from 'react'
import { useParams } from 'react-router'
import { LayoutWithNavbar } from '../../components'

import AlbumTracks from './AlbumTracks'
import AlbumInfo from './AlbumInfo'
import SimilarAlbums from './SimilarAlbums'

const makeNavbarData = id => [
  {
    title: 'Album tracks',
    to: `/albums/${id}/tracks`,
    key: `tracks`,
    component: AlbumTracks,
  },
  {
    title: 'Similar albums',
    to: `/albums/${id}/similar`,
    key: `similar`,
    component: SimilarAlbums,
  },
  {
    title: 'Album info',
    to: `/albums/${id}/info`,
    key: `info`,
    component: AlbumInfo,
  },
]

const AlbumDetail = () => {
  const { id: albumId } = useParams()
  const navbarData = makeNavbarData(albumId)

  return <LayoutWithNavbar data={navbarData} splitLocationValue={3} />
}

AlbumDetail.propTypes = {}

export default AlbumDetail
