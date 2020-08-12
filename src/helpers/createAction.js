import get from 'lodash/get'

import axiosInstance from './axiosInstance'
import getEntityDataPath from './getEntityDataPath'

const createActionTypes = actionType => {
  const typeState = actionType.split('_').reverse()
  let successType = null
  let errorType = null
  if (typeState[0].includes('REQUEST')) {
    successType = typeState
      .map((item, index) => (index === 0 ? 'SUCCESS' : item))
      .reverse()
      .join('_')
    errorType = typeState
      .map((item, index) => (index === 0 ? 'ERROR' : item))
      .reverse()
      .join('_')
  }
  return {
    startType: actionType,
    successType,
    errorType,
  }
}

const createAction = (type, prepareAction) => {
  const actionTypes = createActionTypes(type)
  const { startType, successType, errorType } = actionTypes

  const actionCreator = args => dispatch => {
    const data = get(args, 'data')
    const prepared = typeof prepareAction === 'function' ? prepareAction(data) : prepareAction
    dispatch({ type: startType, payload: args })

    const url = get(prepared, 'url')

    if (!url) {
      return new Promise(resolve => resolve(args))
    }

    const preparedParams = get(prepared, 'params') || {}
    const argsParams = get(args, 'params') || {}
    const params = { ...preparedParams, ...argsParams }
    const config = { ...prepared, params }

    return axiosInstance(config)
      .then(response => {
        const dataPath = `data.${getEntityDataPath(response.data)}`
        const countPatch = 'data.meta.totalCount'
        const returnedCountPath = 'data.meta.returnedCount'
        const responseData = get(response, dataPath)
        const responseCount = get(response, countPatch)
        const responseReturnedCount = get(response, returnedCountPath)
        const payload = {
          items: responseData,
          totalCount: responseCount,
          returnedCount: responseReturnedCount,
        }
        dispatch({
          type: successType,
          payload,
        })
        return { ...response, transformedData: payload }
      })
      .catch(error => {
        const errorCode = get(error, 'response.data.code')
        if (errorCode === 'UnauthorizedError') {
          // TODO add error handling
        }
        dispatch({ type: errorType, payload: error })
        return new Promise((resolve, reject) => reject(error))
      })
  }

  actionCreator.start = startType
  actionCreator.success = successType
  actionCreator.error = errorType

  return actionCreator
}

export default createAction
