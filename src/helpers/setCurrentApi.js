import { AVAILABLE_API, CURRENT_API_NAME } from 'constants'
import { localStore } from 'config'

const setCurrentApi = name => {
  localStore.setItem(CURRENT_API_NAME, AVAILABLE_API[name])
}

export default setCurrentApi