import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Header />
        {children}
      </div>
    )
  }
}

Layout.propTypes = {

}

export default Layout