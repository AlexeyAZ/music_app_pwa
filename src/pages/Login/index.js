import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getCurrentApi } from 'helpers'

const { authUrl, clientId } = getCurrentApi()

const REDIRECT_URI = 'http://192.168.1.11:3000' // TODO localhost 192.168.1.102 192.168.1.11

class Login extends Component {
  handleLoginButtonClick = () => {
    window.open(
      `${authUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code`,
      '_self'
    )
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleLoginButtonClick}>
          Login with Napster
        </button>
      </div>
    )
  }
}

Login.propTypes = {}

export default Login
