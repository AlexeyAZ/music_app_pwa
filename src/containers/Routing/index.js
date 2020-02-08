import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

const RenderRoute = ({ component: Component, path, routes }) => {
  return (
    <Route
      path={path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <Component {...props} routes={routes} />
      )}
    />
  )
}

const RouteWithSubRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RenderRoute key={i} {...route} />
      })}
    </Switch>
  )
}

const Routing = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RenderRoute key={i} {...route} />
      })}
      <Route
        component={() => (
          <div>
            <p>404</p>
          </div>
        )}
      />
    </Switch>
  )
}

Routing.propTypes = {
  routes: PropTypes.array,
}
Routing.defaultProps = {
  routes: [],
}

export { Routing, RouteWithSubRoutes, RenderRoute }
