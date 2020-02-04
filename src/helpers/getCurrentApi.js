import { CURRENT_API_NAME, AVAILABLE_API } from 'constants'

import { apiNapster, apiSpotify, apiBackend, localStore } from 'config'

const apiConfig = {
  [AVAILABLE_API.NAPSTER]: apiNapster,
  [AVAILABLE_API.SPOTIFY]: apiSpotify,
}

const currentApi = localStore.getItem(CURRENT_API_NAME)

const getCurrentApi = () => {
  return ({
    ...apiConfig[currentApi],
    ...apiBackend,
  })
}

export default getCurrentApi