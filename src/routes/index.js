import Main from '../pages/Main'
import Login from '../pages/Login'
import Genres from '../pages/Genres'
import Tracks from '../pages/Tracks'
import Library from '../pages/Library'
import Artists from '../pages/Library/Artists'
import Playlists from '../pages/Library/Playlists'
import Favorites from '../pages/Library/Favorites'
import Trending from '../pages/Trending'
import Profile from '../pages/Profile'

const routes = [
  {
    path: '/',
    title: 'Main',
    component: Main,
    exact: true,
  },
  {
    path: '/login',
    title: 'Authorization',
    component: Login,
  },
  {
    path: '/genres',
    title: 'Genres',
    component: Genres,
  },
  {
    path: '/tracks',
    title: 'Tracks',
    component: Tracks,
  },
  {
    path: '/library',
    title: 'Library',
    component: Library,
    routes: [
      {
        path: '/library/favorites',
        title: 'Favorites',
        component: Favorites,
      },
      {
        path: '/library/playlists',
        title: 'Playlists',
        component: Playlists,
      },
      {
        path: '/library/artists',
        title: 'Artists',
        component: Artists,
      },
      {
        path: '/library/albums',
        title: 'Albums',
        component: Artists,
      },
      {
        path: '/library/tracks',
        title: 'Tracks',
        component: Artists,
      },
    ],
  },
  {
    path: '/trending',
    title: 'Trending',
    component: Trending,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
]

export default routes
