import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import get from 'lodash/get'

import { getEntityDataPath } from '../helpers'

import * as TempStorageModule from '../modules/tempStorage'

const defaultLimit = 100

const generateTempStorageId = (pagePathname, requestUrl) => {
  if (pagePathname && requestUrl) {
    return `_page:${pagePathname};_request:${requestUrl}`
  }
  throw new Error('generateTempStorageId: set pagePathname and requestUrl')
}

const useTempStorageRequest = ({
  action,
  storageId,
  requestParams,
  requestData,
  responseDataPatch,
  responseCountPatch,
}) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [tempStorageId, setTempStorageId] = useState(null)
  const [page, setPage] = useState(0)
  const addItemsToTempStorage = useCallback(
    data => dispatch(TempStorageModule.addItemsToTempStorage(data)),
    [dispatch]
  )
  const tempStorage = useSelector(state =>
    TempStorageModule.getTempStorageByIdSelector(state, tempStorageId)
  )

  useEffect(() => {
    const fetchData = async () => {
      const limit = get(requestParams, 'limit') || defaultLimit
      const params = { limit, offset: limit * page }
      const requestOptions = requestData ? { data: requestData, params } : { params }
      const response = await action(requestOptions)
      const pageUrl = get(location, 'pathname')
      const responseUrl = get(response, 'config.url')
      const newTempStorageId = storageId || generateTempStorageId(pageUrl, responseUrl)
      setTempStorageId(newTempStorageId)
    }
    fetchData()
  }, [])

  const fetchData = useCallback(async () => {
    const limit = get(requestParams, 'limit') || defaultLimit
    const params = { limit, offset: limit * page }

    const requestOptions = requestData ? { data: requestData, params } : { params }
    const response = await action(requestOptions)
    const pageUrl = get(location, 'pathname')
    const responseUrl = get(response, 'config.url')
    const newTempStorageId = storageId || generateTempStorageId(pageUrl, responseUrl)
    setTempStorageId(newTempStorageId)
    const dataPath = responseDataPatch || `data.${getEntityDataPath(response.data)}`
    const entityData = get(response, dataPath, [])
    const countPatch = responseCountPatch || 'data.meta.totalCount'
    const entityCount = get(response, countPatch)
    console.log(tempStorage)
    console.log(page)
    if (tempStorage && tempStorage.page > page) {
      setPage(tempStorage.page)
      return
    }
    setPage(page + 1)
    await addItemsToTempStorage({
      storageId: newTempStorageId,
      items: entityData,
      totalCount: entityCount,
      query: params,
      page,
      // page: this.page,
    })
  }, [requestParams, requestData, page, tempStorage])

  return [fetchData, { tempStorageId }]
}

export default useTempStorageRequest
