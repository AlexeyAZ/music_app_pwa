import React from 'react'

import { LayoutWithNavbar } from '../../components'

import Favorites from './Favorites'
import Playlists from './Playlists'
import Artists from './Artists'

const navbarData = [
  {
    title: 'Favorites',
    to: `/library/favorites`,
    key: `favorites`,
    component: Favorites,
  },
  {
    title: 'Playlists',
    to: `/library/playlists`,
    key: `playlists`,
    component: Playlists,
  },
  {
    title: 'Artists',
    to: `/library/artists`,
    key: `artists`,
    component: Artists,
  },
  {
    title: 'Albums',
    to: `/library/albums`,
    key: `albums`,
    component: Artists,
  },
  {
    title: 'Tracks',
    to: `/library/tracks`,
    key: `tracks`,
    component: Artists,
  },
]

const Library = () => <LayoutWithNavbar data={navbarData} />

Library.propTypes = {}

export default Library
