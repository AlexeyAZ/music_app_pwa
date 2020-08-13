import get from 'lodash/get'

import { createAction, createReducer } from '../helpers'

export const searchContent = createAction('SEARCH_CONTENT_REQUEST', {
  url: `/search`,
})

export const getSearchContentResultsSelector = (state) => get(state, 'data') || []

const searchModule = {
  searchContentResults: createReducer(searchContent),
}

export default searchModule
