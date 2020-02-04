import React from 'react'
// import {
//   Login,
//   Main,
// } from 'containers'
import { Redirect } from 'components'

import Main from '../pages/Main'
import Login from '../pages/Login'
import Genres from '../pages/Genres'
import Tracks from '../pages/Tracks'

// eslint-disable-next-line no-unused-vars
const DummyPage = () => <div>Dummy</div>

const routes = [
  {
    path: '/',
    component: Main,
    // render: () => <Redirect to="/login"/>,
    exact: true,
    private: false,
  },
  {
    path: '/login',
    component: Login,
    exact: false,
    private: false,
  },
  {
    path: '/Genres',
    component: Genres,
    exact: false,
    private: false,
  },
  {
    path: '/tracks',
    component: Tracks,
    exact: false,
    private: false,
  },
]

export default routes
