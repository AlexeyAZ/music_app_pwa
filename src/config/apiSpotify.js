import { AVAILABLE_API } from 'constants'

const apiSpotify = {
  baseUrl: 'https://api.spotify.com',
  authUrl: 'https://accounts.spotify.com',
  authBackendUrl: '/auth-spotify',
  refreshTokenBackendUrl: '/refresh-token-spotify',
  baseVersion: 'v1',
  clientId: 'd6636f756899487ba94e943b49289c47',
  apiName: AVAILABLE_API.SPOTIFY,
}

export default apiSpotify

