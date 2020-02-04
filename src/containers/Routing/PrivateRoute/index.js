import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { Redirect } from '../../../components/index'

const PrivateRoute = ({ userIsAuth, redirectUrl, render, component: Component, ...rest }) => {
  if (render) {
    return (
      <Route {...rest} render={render} />
    )
  }
  return (
    <Route
      {...rest}
      render={props => (userIsAuth ? <Component {...props} /> : <Redirect to={redirectUrl} />)}
    />
  )
}
PrivateRoute.propTypes = {
  userIsAuth: PropTypes.bool,
  redirectUrl: PropTypes.string,
  component: PropTypes.any,
  render: PropTypes.any,
}
PrivateRoute.defaultProps = {
  userIsAuth: false,
  redirectUrl: '/',
  component: null,
  render: null,
}
export default PrivateRoute
