import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ReactNotification from 'react-notifications-component'

import { store, persistor } from 'store'
import { history } from 'config'

import routes from '../../routes'

import Layout from '../Layout'
import PlayerInstance from '../PlayerInstance'

import ScrollToTop from './ScrollToTop'
import AppContainer from './AppContainer'

import 'react-notifications-component/dist/theme.css'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const whyDidYouUpdate = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js')
  whyDidYouUpdate(React)
}

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <ScrollToTop />
            <AppContainer>
              <PlayerInstance />
              <ReactNotification />
              <Layout>{renderRoutes(routes)}</Layout>
            </AppContainer>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
