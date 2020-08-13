import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../modules'

const logger = createLogger({
  collapsed: true,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authOptions'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk, logger))
const persistor = persistStore(store)

export { store, persistor }
