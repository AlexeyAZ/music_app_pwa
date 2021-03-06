import Main from '../pages/Main'
import Login from '../pages/Login'
import Genres from '../pages/Genres'
import GenreDetail from '../pages/GenreDetail'
import Artists from '../pages/Artists'
import ArtistDetail from '../pages/ArtistDetail'
import Tracks from '../pages/Tracks'
import Library from '../pages/Library'
import LibraryArtists from '../pages/Library/Artists'
import Playlists from '../pages/Library/Playlists'
import Favorites from '../pages/Library/Favorites'
import Trending from '../pages/Trending'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import AlbumDetail from '../pages/AlbumDetail'
import PlaylistDetail from '../pages/PlaylistDetail'
import StationDetail from '../pages/StationDetail'

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
    exact: true,
  },
  {
    path: '/genres/:id',
    title: 'Genre detail',
    component: GenreDetail,
    exact: true,
  },
  {
    path: '/artists',
    title: 'Artists',
    component: Artists,
    exact: true,
  },
  {
    path: '/artists/:id/tracks',
    title: 'Artists',
    component: ArtistDetail,
    exact: true,
  },
  {
    path: '/artists/:id/albums',
    title: 'Artists',
    component: ArtistDetail,
    exact: true,
  },
  {
    path: '/artists/:id/info',
    title: 'Artists',
    component: ArtistDetail,
    exact: true,
  },
  {
    path: '/artists/:id',
    title: 'Artists',
    component: ArtistDetail,
    exact: true,
  },
  {
    path: '/tracks',
    title: 'Tracks',
    component: Tracks,
  },
  {
    path: '/albums/:id',
    component: AlbumDetail,
  },
  {
    path: '/albums/:id/tracks',
    component: AlbumDetail,
  },
  {
    path: '/albums/:id/info',
    component: AlbumDetail,
  },
  {
    path: '/albums/:id/similar',
    component: AlbumDetail,
  },
  {
    path: '/playlists/:id',
    title: 'Playlist',
    component: PlaylistDetail,
  },
  {
    path: '/stations/:id',
    title: 'Station',
    component: StationDetail,
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
        component: LibraryArtists,
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
  {
    path: '/search',
    title: 'Search',
    component: Search,
  },
]

export default routes
