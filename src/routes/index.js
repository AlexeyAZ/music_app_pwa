import Main from '../pages/Main'
import Login from '../pages/Login'
import Genres from '../pages/Genres'
import Tracks from '../pages/Tracks'
import Artists from '../pages/Tracks/Artists'
import Playlists from '../pages/Tracks/Playlists'
import Library from '../pages/Library'
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
    routes: [
      {
        path: '/tracks/playlists',
        title: 'Playlists',
        component: Playlists,
      },
      {
        path: '/tracks/artists',
        title: 'Artists',
        component: Artists,
      },
      {
        path: '/tracks/albums',
        title: 'Albums',
        component: Artists,
      },
      {
        path: '/tracks/tracks',
        title: 'Tracks',
        component: Artists,
      },
    ],
  },
  {
    path: '/library',
    title: 'Library',
    component: Library,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
]

export default routes
