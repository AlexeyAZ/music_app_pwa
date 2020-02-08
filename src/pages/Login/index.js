import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components'
import { getCurrentApi } from 'helpers'

const { authUrl, clientId } = getCurrentApi()

const REDIRECT_URI = 'http://localhost:3000/login' //192.168.1.102

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
        <Button onClick={this.handleLoginButtonClick}>Login with Napster</Button>
      </div>
    )
  }
}

Login.propTypes = {}

export default Login
