import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from './PrivateRoute'

const Routing = ({ redirectUrl, routes }) => {
  return (
    <Switch>
      {routes.map(route => {
        if (route.private) {
          return (
            <PrivateRoute
              userIsAuth={false}
              redirectUrl={redirectUrl}
              key={route.path}
              {...route}
            />
          )
        }
        const Children = route.component
        if (Children) {
          return (
            <Route path={route.path} exact={route.exact} private={route.private} key={route.path}>
              <Children />
            </Route>
          )
        }
        return (
          <Route path={route.path} exact={route.exact} render={route.render} private={route.private} key={route.path} />
        )
      })}
      <Route component={() => <div><p>404</p></div>} />
    </Switch>
  )
}
Routing.propTypes = {
  redirectUrl: PropTypes.string,
  routes: PropTypes.array,
}
Routing.defaultProps = {
  redirectUrl: '/',
  routes: [],
}

const mapStateToProps = ({ auth: { data: { isAuth } } }) => ({ isAuth })

export default connect(mapStateToProps)(Routing)
