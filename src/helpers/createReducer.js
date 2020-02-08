const getDefaultInitialState = (data = {}) => ({
  data,
  loading: false,
  error: null,
})

const createDefaultTypes = (start, success, error) => {
  const startType = start ? { [start]: state => ({ ...state, loading: true, error: null }) } : {}

  const successType = success
    ? {
        [success]: (state, payload) => ({
          ...state,
          data: payload,
          loading: false,
          error: null,
        }),
      }
    : {}

  const errorType = error
    ? { [error]: (state, payload) => ({ ...state, loading: false, error: payload }) }
    : {}
  return { ...startType, ...successType, ...errorType }
}

const createReducer = (
  { start, success, error },
  { initialState = null, initialData = {}, customTypes = null } = {}
) => {
  if (customTypes && !initialState) {
    throw new Error(`Set initial state for ${start} reducer`)
  }

  return (state = initialState || getDefaultInitialState(initialData), action) => {
    const defaultTypes = createDefaultTypes(start, success, error)

    const resultTypes = customTypes || defaultTypes

    if (resultTypes[action.type]) {
      return resultTypes[action.type](state, action.payload)
    }
    return state
  }
}

export default createReducer
